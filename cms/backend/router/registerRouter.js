const express = require('express');
const registerRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const bcrypt = require('bcryptjs');
const e = require('express');

registerRouter.post('/login', (req, res) => {

    let usernamePatetrn = /^[a-z0-9A-Z\!\_\.\-]{3,18}$/g;
    let passwordPattern = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g

    if ( usernamePatetrn.test(req.body.username.trim()) && passwordPattern.test(req.body.password.trim()) ) {



        panelbaz_db.query(`SELECT * FROM admin`, (err, adminResult) => {


            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                    data: []
                })
            }
            else {

                if (adminResult.length) {

                    adminResult.forEach(admin => {
                        bcrypt.compare(req.body.password.trim(), admin.password)
                            .then(checkPassword => {
                                if (checkPassword && req.body.username.trim() == admin.username) {
                                    return admin.admin_token;
                                }
                                return false;
                            })
                            .then(checkAdmin => {

                                if (!checkAdmin) {
                                    res.json({
                                        isOk: false,
                                        responseText: "نام کاربری یا رمز عبور اشتباه است",
                                        data: []
                                    })
                                }
                                else {
                                    res.json({
                                        isOk: true,
                                        responseText: "ورود به پنل موفقیت امیز بود",
                                        data: checkAdmin
                                    })
                                }
                            })

                    });

                }

            }
        })

    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا نام کاربری و رمز عبور معتبر وارد کنید",
            data: []
        })
    }


})

registerRouter.get('/auth/:sesstion', (req, res) => {

    let sidPattern = /^(\w|\d|-|_){32}$/g;


    if (sidPattern.test(req.params.sesstion.trim()) && req.params.sesstion.trim() != "") {


        panelbaz_db.query(`SELECT firstname, lastname, username, admin_token, email, phone, profile FROM admin WHERE admin_token = '${req.params.sesstion.trim()}'`, (err, adminResult) => {

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
                    responseText: "خوش امدید",
                    data: adminResult
                })
            }
        })


    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در اعتبار سنجی",
            data: []
        })
    }


})


module.exports = registerRouter;