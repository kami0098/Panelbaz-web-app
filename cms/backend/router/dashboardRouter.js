const express = require('express');
const dashboardRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');

dashboardRouter.get('/', (req, res) => {
    panelbaz_db.query('SELECT * FROM users', (userErr, userResult) => {
        if (userErr) {
            res.json({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                data: []
            })
        }
        else {

            panelbaz_db.query('SELECT * FROM orders', (orderErr, ordersResult) => {
                if (orderErr) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                        data: []
                    })
                }
                else {

                    panelbaz_db.query('SELECT * FROM tikets', (tiketErr, tiketsResult) => {
                        if (tiketErr) {
                            res.json({
                                isOk: false,
                                responseText: "خطا در پایگاه داده",
                                data: []
                            })
                        }
                        else {
                            panelbaz_db.query('SELECT * FROM transactions', (transactionErr, transactionsResult) => {
                                if (transactionErr) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا در پایگاه داده",
                                        data: []
                                    })
                                }
                                else {


                                    let dashboardResultData = {
                                        users: userResult,
                                        orders: ordersResult,
                                        tikets: tiketsResult,
                                        transactions: transactionsResult
                                    }

                                    res.json({
                                        isOk: true,
                                        responseText: "اطلاعات پایه داشبورد ادمین",
                                        data: dashboardResultData
                                    })

                                }
                            })
                        }
                    })

                }
            })


        }
    })


})

module.exports = dashboardRouter;