const express = require('express');
const transactionRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');
const persianDate = require('persian-date');


transactionRoute.post('/:userToken', (req, res) => {
    if (validate.sessionIdValidatro(req.params.userToken)) {
        getUserInfo.getAuthUserInfo(req.params.userToken)
            .then(userInfo => {

                let transActionDate = ` ${new persianDate().hours()}:${new persianDate().minutes()}:${new persianDate().seconds()} ${new persianDate().years()} ${new persianDate([new persianDate().years(), new persianDate().month(), new persianDate().days()]).format('MMMM')} ${new persianDate().dates()}`;
                let userTransActionInfo = `${userInfo[0].firstname} ${userInfo[0].lastname}\n${userInfo[0].phone}`;

                getUserInfo.getUserID(req.params.userToken)
                    .then(userId => {

                        let transActionQuery = `INSERT INTO transactions(userID, date, status, price, user_info, description, action_time) VALUES (${userId[0].id},'${transActionDate}',${1},${req.body.price},'${userTransActionInfo}','اعتبار قبل از شارژ : ${userInfo[0].inventory}', ${Math.round(Date.now() / 1000)})`;
                        panelbaz_db.query(transActionQuery, (err, result) => {
                            if (err) {
                                res.json({
                                    isOk: false,
                                    paymentResult: [],
                                    responseText: "خطا در پایگاه داده",
                                })
                            }
                            else {

                                panelbaz_db.query(`UPDATE users SET inventory = inventory + ${req.body.price}, amount = amount + ${req.body.price}, transactions_count = transactions_count + 1 WHERE id = ${userId[0].id}`, (upErr, upResult) => {
                                    if (upErr) {
                                        res.json({
                                            isOk: false,
                                            paymentResult: [],
                                            responseText: "خطا در پایگاه داده",
                                        })
                                    }
                                    else {
                                        res.json({
                                            isOk: true,
                                            paymentResult: [req.params.userToken, userTransActionInfo, req.body.price, transActionDate, userInfo[0].inventory],
                                            responseText: "پرداخت شما با موفقیت انجام شد",
                                        })
                                    }
                                })


                            }
                        })
                    })

            })
    }
    else {
        res.json({
            isOk: false,
            paymentResult: [],
            responseText: "خطا در اعتبار سنجی",
            isAuthErr: true
        })
    }
})


transactionRoute.get('/:userToken', (req, res) => {
    let userToken = req.params.userToken;

    if (validate.sessionIdValidatro(userToken)) {
        getUserInfo.getUserID(userToken).then(userId => {
            let selectUserTransActionsQuery = `SELECT id, date, status, price, user_info, description FROM transactions WHERE userID = ${userId[0].id}`;

            panelbaz_db.query(selectUserTransActionsQuery, (err, result) => {
                if (err) {
                    res.json({
                        isOk: false,
                        paymentsData: [],
                        responseText: "خطا در  پایگاه داده",
                    })
                }
                else {

                    res.json({
                        isOk: true,
                        responseText: "لیست تراکنش های شما",
                        paymentsData: result
                    })
                }
            })

        })
    }
    else {
        res.json({
            isOk: false,
            paymentsData: [],
            responseText: "خطا در اعتبار سنجی",
            isAuthErr: true
        })
    }

})


module.exports = transactionRoute;
