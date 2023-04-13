const express = require('express');
const ordersRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');

ordersRoute.get('/', (req, res) => {

    panelbaz_db.query(`SELECT * FROM users_orders_status`, (err, order_status_data) => {
        if (err) {
            res.json({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                data: []
            })
        }
        else {

            panelbaz_db.query(`SELECT categories.title AS category_name, products.title AS product_name, services.title AS service_name, orders.count, orders.userID,orders.id, orders.price, orders.date, orders.link FROM orders 
            INNER JOIN categories ON categoryID = categories.id
            INNER JOIN products ON productsID = products.id
            INNER JOIN services ON servicesID = services.id`, (err, ordersData) => {
                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                        data: []
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "تمام سفارش ها",
                        data: {
                            orders: ordersData,
                            ordersStatus: order_status_data,
                        }
                    })
                }
            })

        }
    })
})

ordersRoute.get('/order/:orderId', (req, res) => {
    let orderIdPatetrn = /^[1-9][0-9]{0,9}$/g

    if (req.params.orderId.trim() == "0") {
        res.json({
            isOk: false,
            responseText: "کاربر سفارشی رو برای این تیکت ثبت نکرده است",
            data: []
        })
    }
    else {
        let selectOrderInfoQuery = `SELECT categories.title AS category_name, products.title AS product_name, services.title AS service_name, orders.count, orders.price, orders.date, orders.link FROM orders 
        INNER JOIN categories ON categoryID = categories.id
        INNER JOIN products ON productsID = products.id
        INNER JOIN services ON servicesID = services.id WHERE orders.id = ${req.params.orderId}`;

        if (orderIdPatetrn.test(req.params.orderId)) {

            panelbaz_db.query(selectOrderInfoQuery, (err, ordersData) => {
                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                        data: []
                    })
                    console.log(err);
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "سفارش انتخاب شد",
                        data: ordersData
                    })
                }
            })
        }
        else {
            res.json({
                isOk: false,
                responseText: "خطا در ارسال درخواست",
                data: []
            })
        }
    }




})


ordersRoute.post('/edit-order/:orderId', (req, res) => {

    let orderIdPattern = /^[1-9][0-9]{0,9}$/g

    if (orderIdPattern.test(req.params.orderId)) {

        panelbaz_db.query(`UPDATE orders SET link='${req.body.link}',count=${req.body.count},price=${(req.body.count * req.body.service_price) / 1000} WHERE id = ${req.params.orderId}`, (err, orderResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "سفارش مورد نظر با موفقیت ویرایش شد",
                })
            }
        })
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال درخواست",
        })
    }


})


// order status 

ordersRoute.get('/order-status/canceled/:orderId/:statusNumber', (req, res) => {

    let orderIdPattern = /^[1-9][0-9]{0,9}$/g

    if (orderIdPattern.test(req.params.orderId) && /^1|0$/g.test(req.params.statusNumber)) {

        panelbaz_db.query(`UPDATE users_orders_status SET canceled=${req.params.statusNumber == "1" ? "1" : "0"} ,canceling=0 ,pending=${req.params.statusNumber == "1" ? "0" : "1"}  WHERE orderID = ${req.params.orderId}`, (err, orderResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "وضعیت سفارش لغو شده با موفقیت ثبت شد",
                })
            }
        })
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال درخواست",
        })
    }



})

ordersRoute.get('/order-status/:statusColumn/:orderId', (req, res) => {
    let orderIdPattern = /^[1-9][0-9]{0,9}$/g
    let orderColPattern = /^canceled|canceling|incompleted|pending|doing|completed$/g;

    if (orderColPattern.test(req.params.statusColumn.trim()) && orderIdPattern.test(req.params.orderId)) {

        panelbaz_db.query(`UPDATE users_orders_status SET completed=0, doing=0,canceled=0,canceling=0,incompleted=0,pending=0 WHERE orderID = ${req.params.orderId}`, (err, orderResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {

                panelbaz_db.query(`UPDATE users_orders_status SET ${req.params.statusColumn} = 1 WHERE orderID = ${req.params.orderId}`, (err, orderResult) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            responseText: "خطا در پایگاه داده",
                        })
                    }
                    else {
                        res.json({
                            isOk: true,
                            responseText: "وضعیت سفارش لغو شده با موفقیت ثبت شد",
                        })
                    }
                })

            }
        })
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال درخواست",
        })
    }

    // 


})


ordersRoute.get('/order-get-status/:orderId', (req, res) => {
    let orderIdPattern = /^[1-9][0-9]{0,9}$/g

    if (orderIdPattern.test(req.params.orderId)) {

        panelbaz_db.query(`SELECT doing, completed, canceled, canceling, pending, incompleted FROM users_orders_status WHERE orderID = ${req.params.orderId}`, (err, orderResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                    data: []
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "وضعیت کاربر",
                    data: orderResult
                })
            }
        })
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال درخواست",
            data: []
        })
    }

    // 


})

module.exports = ordersRoute