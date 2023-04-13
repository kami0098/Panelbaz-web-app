const express = require('express');
const orderRoutes = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');
const persianDate = require('persian-date');
const e = require('express');

// let urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
// let numberCountPattern = /^[1-9]\d{2,6}$/g;

orderRoutes.post('/record-order/:userToken', (req, res) => {
    let orderService = req.body;
    let serviceIdPattern = /^[1-9]\d{0,6}$/g;
    let productIdPattern = /^[1-9]\d{0,6}$/g;
    let urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    let numberCountPattern = /^[1-9]\d{2,6}$/g;


    if (validate.sessionIdValidatro(req.params.userToken)) {
        if (urlPattern.test(orderService.link)) {
            if (numberCountPattern.test(orderService.orderCount)) {

                if (serviceIdPattern.test(orderService.serviceID) && productIdPattern.test(orderService.productID)) {

                    getUserInfo.getUserID(req.params.userToken)
                        .then(userID => {

                            panelbaz_db.query(`SELECT * FROM services WHERE id = ${orderService.serviceID}`, (serviceErr, serviceData) => {
                                if (serviceErr) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا در پایگاه داده",
                                    })
                                }
                                else {
                                    let serviceCountPrice = serviceData[0].price * orderService.orderCount / 1000;

                                    getUserInfo.getAuthUserInfo(req.params.userToken)
                                        .then(userData => {

                                            if (serviceData[0].max >= orderService.orderCount && serviceData[0].min <= orderService.orderCount) {

                                                if (userData[0].inventory >= serviceCountPrice) {

                                                    let transActionDate = ` ${new persianDate().hours()}:${new persianDate().minutes()}:${new persianDate().seconds()} ${new persianDate().years()} ${new persianDate([new persianDate().years(), new persianDate().month(), new persianDate().days()]).format('MMMM')} ${new persianDate().dates()}`;

                                                    let insertOrderQuery = `INSERT INTO orders(categoryID, productsID, servicesID, userID, date, link, count, price, action_time) VALUES (${serviceData[0].categoryID},${serviceData[0].productID},${serviceData[0].id}, ${userID[0].id},'${transActionDate}','${orderService.link}','${orderService.orderCount}','${serviceCountPrice}', ${Math.round(Date.now() / 1000)})`;

                                                    panelbaz_db.query(insertOrderQuery, (inertOrderErr, orderRes) => {

                                                        if (inertOrderErr) {
                                                            res.json({
                                                                isOk: false,
                                                                responseText: "خطا در پایگاه داده",
                                                            })
                                                        }
                                                        else {

                                                            panelbaz_db.query("SELECT id FROM orders ORDER BY ID DESC LIMIT 1", (lastErr, lastRes) => {

                                                                if (lastErr) {
                                                                    res.json({
                                                                        isOk: false,
                                                                        responseText: "خطا در پایگاه داده",
                                                                    })
                                                                }
                                                                else {

                                                                    let insertOrderStatusQuery = `INSERT INTO users_orders_status(userID, servicesID, completed, doing, canceled, canceling, incompleted, orderID) VALUES (${userID[0].id},${serviceData[0].id},0,0,0,0,0, ${lastRes[0].id})`;
                                                                    panelbaz_db.query(insertOrderStatusQuery, (insertStErr, stRes) => {

                                                                        if (insertStErr) {
                                                                            res.json({
                                                                                isOk: false,
                                                                                responseText: "خطا در پایگاه داده",
                                                                            })
                                                                        }
                                                                        else {
                                                                            panelbaz_db.query(`UPDATE users SET inventory = ${userData[0].inventory - serviceCountPrice}, orders_count = orders_count + 1 WHERE id = ${userID[0].id}`, (upErr, upRes) => {
                                                                                if (upErr) {
                                                                                    res.json({
                                                                                        isOk: false,
                                                                                        responseText: "خطا در پایگاه داده",
                                                                                    })
                                                                                }
                                                                                else {

                                                                                    res.json({
                                                                                        isOk: true,
                                                                                        responseText: "سفارش شما با موفقیت ثبت شد \n (مشاهده جزییات : بخش سفارش ها)",
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }

                                                            })


                                                        }
                                                    })

                                                }
                                                else {
                                                    res.json({
                                                        isOk: false,
                                                        responseText: "موجودی کافی نیست \n لطفا موجودی خود را افزایش دهید",
                                                    })
                                                }

                                            }
                                            else {
                                                res.json({
                                                    isOk: false,
                                                    responseText: "تعداد وارد شده کمتر یا بیشتر از حد مجاز است",
                                                })
                                            }

                                        })
                                }
                            })


                        })


                }
                else {
                    res.json({
                        isOk: false,
                        responseText: "مقدار شناسه سفارش نا معتبر است",
                    })

                }
            }
            else {
                res.json({
                    isOk: false,
                    responseText: "تعداد وارد شده صحیح نیست",
                })
            }
        }
        else {
            res.json({
                isOk: false,
                responseText: "لینک وارد شده معتبر نیست",
            })
        }

    }


})

orderRoutes.get('/all-orders/:userToken', (req, res) => {
    if (validate.sessionIdValidatro(req.params.userToken)) {

        getUserInfo.getUserID(req.params.userToken)
            .then(userID => {
                let getAllOrdersQuery = `
            
                SELECT orders.id, categories.title, products.title, services.title, users.firstname, orders.date, orders.link, orders.count, orders.price
                FROM orders 
                INNER JOIN categories ON orders.categoryID = categories.id 
                INNER JOIN products ON orders.productsID = products.id
                INNER JOIN services ON orders.servicesID = services.id
                INNER JOIN users ON orders.userID = users.id
                WHERE orders.userID = ${userID[0].id}


            `;
                panelbaz_db.query(getAllOrdersQuery, (err, orderRes) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            responseText: "خطا در پایگاه داده",
                            ordersData: []
                        })
                    }
                    else {

                        panelbaz_db.query(`SELECT * FROM users_orders_status WHERE userID = ${userID[0].id}`, (stErr, orderStatusRes) => {
                            if (stErr) {
                                res.json({
                                    isOk: false,
                                    responseText: "خطا در پایگاه داده",
                                    ordersData: []
                                })



                            }
                            else {

                                let ordersArray = [];
                                orderRes.forEach(order => {

                                    orderStatusRes.forEach(statusOrder => {
                                        if (order.id == statusOrder.orderID) {
                                            ordersArray.push([order, statusOrder])
                                        }
                                    })
                                });

                                res.json({
                                    isOk: true,
                                    responseText: "تمام سفارش های شما",
                                    ordersData: ordersArray
                                })
                            }
                        })
                    }
                })

            })

    }
})

orderRoutes.get('/:orderID/:userToken', (req, res) => {
    let orderIdPattern = /^[1-9]\d{0,6}$/g;

    if (validate.sessionIdValidatro(req.params.userToken)) {
        if (orderIdPattern.test(req.params.orderID)) {

            getUserInfo.getUserID(req.params.userToken)
                .then(userID => {
                    panelbaz_db.query(`SELECT * FROM orders WHERE userID = ${userID[0].id} AND id = ${req.params.orderID}`, (err, orderRes) => {
                        if (err) {
                            res.json({
                                isOk: false,
                                responseText: "خطا در پایگاه داده",
                                orderData: []
                            })
                        }
                        else {
                            res.json({
                                isOk: true,
                                responseText: "سفارش شما برای تغییر",
                                ordersData: orderRes
                            })
                        }
                    })
                })

        }
        else {
            res.json({
                isOk: false,
                responseText: "شناسه سفارش معتبر نیست",
                orderData: []
            })
        }
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در اعتبار سنجی",
            orderData: []
        })
    }
})

orderRoutes.post('/edit-order/:orderID/:userToken', (req, res) => {

    let orderIdPattern = /^[1-9]\d{0,6}$/g;
    let urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    let numberCountPattern = /^[1-9]\d{2,6}$/g;

    if (validate.sessionIdValidatro(req.params.userToken)) {
        if (orderIdPattern.test(req.params.orderID)) {

            if (urlPattern.test(req.body.link) && numberCountPattern.test(req.body.count)) {


                panelbaz_db.query(`SELECT id, inventory FROM users WHERE user_token = '${req.params.userToken}'`, (userErr, userData) => {
                    if (userErr) {
                        res.json({
                            isOk: false,
                            responseText: "خطا در پایگاه داده",
                        })
                    }
                    else {

                        if (req.body?.isDecreaseInventory <= userData[0].inventory || req.body.isEqual || req.body?.isIncreaseInventory) {

                            panelbaz_db.query(`UPDATE orders SET link='${req.body.link}',count=${req.body.count},price=${req.body.price} WHERE userID = ${userData[0].id} AND id = ${req.params.orderID}`, (err, orderRes) => {
                                if (err) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا در پایگاه داده",
                                    })
                                }
                                else {

                                    if (!req.body.isEqual) {
                                        let userOrderActionQuery = `UPDATE users SET ${req.body?.isIncreaseInventory ? `inventory = inventory + ${req.body.isIncreaseInventory}` : `inventory = inventory - ${req.body.isDecreaseInventory}`} WHERE id = ${userData[0].id}`;

                                        panelbaz_db.query(userOrderActionQuery, (UAERR, UARes) => {


                                            if (UAERR) {
                                                res.json({
                                                    isOk: false,
                                                    responseText: "خطا در پایگاه داده",
                                                })
                                            }
                                            else {
                                                res.json({
                                                    isOk: true,
                                                    responseText: "سفارش شما با موفقیت تغییر یافت",
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            isOk: true,
                                            responseText: "سفارش شما با موفقیت تغییر یافت",
                                        })
                                    }


                                }
                            })

                        }
                        else {
                            res.json({
                                isOk: false,
                                responseText: "موجودی شما کافی نیست",
                            })
                        }

                    }
                })


            }
            else {
                res.json({
                    isOk: false,
                    responseText: "خطا لینک یا تعداد اشتباه است",
                })
            }


        }
        else {
            res.json({
                isOk: false,
                responseText: "خطا شماره سفارش نا معتبر است",
            })
        }
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در اعتبار سنجی",
        })
    }
})

orderRoutes.get('/cancel-order/:orderID/:userToken', (req, res) => {
    let orderIdPattern = /^[1-9]\d{0,6}$/g;
    if (validate.sessionIdValidatro(req.params.userToken)) {

        if (orderIdPattern.test(req.params.orderID)) {

            getUserInfo.getUserID(req.params.userToken)
                .then(userID => {

                    panelbaz_db.query(`SELECT * FROM users_orders_status WHERE userID = ${userID[0].id} AND orderID = ${req.params.orderID}`, (stErr, statusData) => {
                        if (stErr) {
                            res.json({
                                isOk: false,
                                responseText: "خطا در پایگاه داده",
                            })
                        }
                        else {
                            if (statusData[0].pending == 1) {
                                panelbaz_db.query(`UPDATE users_orders_status SET canceling = 1, pending = 0 WHERE userID = ${userID[0].id} AND orderID = ${req.params.orderID}`, (stUpErr, stUpRes) => {

                                    if (stUpErr) {
                                        res.json({
                                            isOk: false,
                                            responseText: "خطا در پایگاه داده",
                                        })
                                    }
                                    else {
                                        res.json({
                                            isOk: true,
                                            responseText: "سفارش شما با موفقیت در حال لغو قرار گرفت \n پس از تایید نهایی ادمین لغو و مبلغ به حساب شما برگشت داده خواهد شد",
                                        })
                                    }
                                })
                            }
                            else {
                                res.json({
                                    isOk: false,
                                    responseText: "خطا این سفارش درحال پردازش است و قابل تغییر نیست",
                                })
                            }
                        }

                    })

                })

        }
        else {
            res.json({
                isOk: false,
                responseText: "خطا شماره سفارش نا معتبر است",
            })
        }
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در اعتبار سنجی",
        })
    }


})


module.exports = orderRoutes;

