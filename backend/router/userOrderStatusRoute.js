const express = require('express');
const UserOrderStatusRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');
const { response } = require('express');

UserOrderStatusRoute.get('/', (req, res) => {


    if (validate.sessionIdValidatro(req.headers.authorization)) {
        getUserInfo.getUserID(req.headers.authorization)
            .then(userId => {

                panelbaz_db.query(`SELECT * FROM users_orders_status WHERE userID = ${userId[0].id}`, (err, result) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            userOrdersStatus: [],
                            responseText: "خطا در پایگاه داده"
                        })
                    }
                    else {

                        if (!result.length) {
                            res.json({
                                isOk: true,
                                userOrdersStatus: result,
                                responseText: "هنوز سفارشی ثبت نکرده اید"
                            })

                        }
                        else {
                            res.json({
                                isOk: true,
                                userOrdersStatus: result,
                                responseText: "نمایش وضعیت سفارش های شما"
                            })
                        }
                    }
                })


            })
    }
    else {
        res.json({
            isOk: false,
            userOrdersStatus: [],
            isAuthErr: true,
            responseText: "خطا در اعتبار سنجی"
        })
    }


})

UserOrderStatusRoute.get('/get-order/:userToken/:orderId', (req, res) => {
    let orderIdPattern = /^[1-9]{1,8}$/g;

    if (validate.sessionIdValidatro(req.params.userToken)) {
        if (orderIdPattern.test(req.params.orderId)) {

            getUserInfo.getUserID(req.params.userToken)
                .then(userId => {

                    panelbaz_db.query(`SELECT * FROM users_orders_status WHERE userID = ${userId[0].id} AND orderID = ${req.params.orderId}`, (err, stRes) => {

                        if (err) {
                            res.json({
                                isOk: false,
                                userOrdersStatus: [],
                                responseText: "خطا در پایگاه داده"
                            })
                        }
                        else {
                            res.json({
                                isOk: true,
                                userOrdersStatus: stRes,
                                responseText: "وضعیت سفارش"
                            })
                        }

                    })

                })
        }
    }
})

module.exports = UserOrderStatusRoute;



