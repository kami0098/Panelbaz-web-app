const express = require('express');
const usersRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const bcrypt = require('bcryptjs');
const e = require('express');

usersRouter.get('/', (req, res) => {
    panelbaz_db.query('SELECT * FROM users', (err, userResult) => {
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
                responseText: "تمام کاربر ها",
                data: userResult
            })
        }
    })
})

usersRouter.get('/user/:userId', (req, res) => {
    let userIdPattern = /^[1-9][0-9]{0,9}$/g

    if (userIdPattern.test(req.params.userId)) {

        panelbaz_db.query(`SELECT * FROM users WHERE id = ${req.params.userId}`, (err, userResult) => {
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
                    responseText: "کاربر انتخاب شد",
                    data: userResult
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

usersRouter.post('/update/:userId', (req, res) => {

    let userIdPattern = /^[1-9][0-9]{0,9}$/g

    let firstnamePattern = /^[ا-ی\sa-zA-Z]{3,20}$/g;
    let lastnamePattern = /^[ا-ی\sa-zA-Z]{3,30}$/g;
    let emailPattern = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/g;
    let usernamePatetrn = /^[a-z0-9A-Z\!\_\.\-]{3,18}$/g;
    let phoneNumberPattern = /^(09)([0-9]{9})+$/g;
    let transactionCountPattern = /^[0-9]{1,7}$/g;
    let tiketCountPattern = /^[0-9]{1,6}$/g;
    let orderCountPattern = /^[0-9]{1,7}$/g;
    let inventoryCountPattern = /^[0-9]{1,20}$/g;
    let amountCountPattern = /^[0-9]{1,30}$/g;
    let checkValidTextPPattern = /(\')|(\")|(\))|(\()|(\*)|(\`)|(\~)|(\^)|(\%)|(\$)|(\@)|(\=)|(\-)|(\{)|(\<)|(\>)|(\})|(\&)/g;


    if (userIdPattern.test(req.params.userId)) {
        if (

            firstnamePattern.test(req.body.firstname) &
            lastnamePattern.test(req.body.lastname) &
            emailPattern.test(req.body.email) &
            usernamePatetrn.test(req.body.username) &
            phoneNumberPattern.test(req.body.phone) &
            transactionCountPattern.test(req.body.transactions_count) &
            tiketCountPattern.test(req.body.tikets_count) &
            orderCountPattern.test(req.body.orders_count) &
            inventoryCountPattern.test(req.body.inventory) &
            amountCountPattern.test(req.body.amount) &
            !checkValidTextPPattern.test(req.body.date)
        ) {
    
            panelbaz_db.query(`UPDATE users SET firstname='${req.body.firstname}',lastname='${req.body.lastname}',email='${req.body.email}',phone='${req.body.phone}',username='${req.body.username}',inventory=${req.body.inventory},orders_count=${req.body.orders_count},tikets_count=${req.body.tikets_count},amount=${req.body.amount} WHERE id = ${req.params.userId}`, (err, userResult) => {
                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "اطلاعات کاربر با موفقیت تغییر یافت",
                    })
                }
            })
        }
        else {
            res.json({
                isOk: false,
                responseText: "لطفا فیلد هارو به درستی پر کنید",
            })
        }
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال درخواست",
        })
    }


})

usersRouter.get('/delete/:userId', (req, res) => {

    let userIdPattern = /^[1-9][0-9]{0,9}$/g

    if (userIdPattern.test(req.params.userId)) {

        panelbaz_db.query(`DELETE FROM users WHERE id = ${req.params.userId}`, (err, userResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "کاربر با موفقیت حذف شد",
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



module.exports = usersRouter;
