const express = require('express');
const adminRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const bcrypt = require('bcryptjs');
const e = require('express');
const { urlencoded } = require('body-parser');

adminRouter.post('/change-info/:adminToken', (req, res) => {

    let firstnamePattern = /^[ا-ی\sa-zA-Z]{3,20}$/g;
    let lastnamePattern = /^[ا-ی\sa-zA-Z]{3,30}$/g;
    let emailPattern = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/g;
    let usernamePatetrn = /^[a-z0-9A-Z\!\_\.\-]{3,18}$/g;
    let phoneNumberPattern = /^(09)([0-9]{9})+$/g;

    let contentBody = JSON.parse(req.body.content)

    if (firstnamePattern.test(contentBody.firstname.trim()) &&
        lastnamePattern.test(contentBody.lastname.trim()) &&
        emailPattern.test(contentBody.email.trim()) &&
        phoneNumberPattern.test(contentBody.phone.trim()) &&
        usernamePatetrn.test(contentBody.username.trim())) {

        const editAdminInfoQueryAction = (filePath) => {
            const changeInfoQuery = `UPDATE admin SET firstname='${contentBody.firstname.trim()}',lastname='${contentBody.lastname.trim()}',username='${contentBody.username.trim()}',email='${contentBody.email.trim()}',phone='${contentBody.phone.trim()}',profile='${filePath}' WHERE admin_token = '${req.params.adminToken}'`;

            panelbaz_db.query(changeInfoQuery, (err, adminResult) => {

                console.log(err);
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
                            bcrypt.compare(contentBody.password.trim(), admin.password)
                                .then(checkPassword => {
                                    if (checkPassword && contentBody.username.trim() == admin.username) {
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


        if (req.files) {
            let file = req.files.files;
            let filename = file.name;
            let fileFormat = filename.slice(-3)

            if (fileFormat == "png" || fileFormat == "jpg" || fileFormat == "svg") {
                if (file.size <= 3145728) {

                    let fileSavePath = __dirname + '\\..\\uploads\\' + Math.round(Date.now() / 1000) + "-" + req.params.adminToken + "-" + filename;
                    file.mv(fileSavePath, (err) => {
                        if (err) {
                            res.json({
                                isOk: false,
                                responseText: "خطا در ذخیره فایل"
                            })
                            console.log(err);
                        }
                        else {
                            editAdminInfoQueryAction(encodeURIComponent(fileSavePath))
                        }
                    })
                }
                else {
                    res.json({
                        isOk: false,
                        responseText: "خطا حجم فایل بیشتر از حد مجاز است"
                    })
                }
            }
            else {
                res.json({
                    isOk: false,
                    responseText: "خطا فرمت انتخاب شده مجاز نیست"
                })
            }
        }
        else {
            editAdminInfoQueryAction(contentBody.profile)
        }


    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا نام کاربری و رمز عبور معتبر وارد کنید",
            data: []
        })
    }







})

adminRouter.post('/change-password/:adminToken', (req, res) => {


    let passwordPattern_1 = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g;
    let passwordPattern_2 = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g;
    let passwordPattern_3 = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g;

    if (passwordPattern_1.test(req.body.current_password.trim()) &&
        passwordPattern_2.test(req.body.new_password.trim()) &&
        passwordPattern_3.test(req.body.confirm_password.trim())) {

        if (req.body.new_password.trim() == req.body.confirm_password.trim()) {

            panelbaz_db.query(`SELECT * FROM admin WHERE admin_token = '${req.params.adminToken}'`, (err, adminResult) => {


                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {

                    if (adminResult.length) {

                        bcrypt.compare(req.body.current_password.trim(), adminResult[0].password)
                            .then(checkPassword => {

                                if (!checkPassword) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا پسوورد فعلی اشتباه است",
                                    })

                                }
                                else {
                                    bcrypt.hash(req.body.new_password.trim(), 10).then(passHashed => {

                                        panelbaz_db.query(`UPDATE admin SET password='${passHashed}' WHERE admin_token = '${req.params.adminToken}'`, (adminErr, upPassRes) => {
                                            if (adminErr) {
                                                res.json({
                                                    isOk: false,
                                                    responseText: "خطا در پایگاه داده",
                                                })
                                            }
                                            else {
    
                                                res.json({
                                                    isOk: true,
                                                    responseText: "پسوورد با موفقیت تغییر کرد",
                                                })
                                            }
    
    
                                        })
                                    })

                                }

                            })


                    }

                }
            })
        }
        else {
            res.json({
                isOk: false,
                responseText: "پسوورد جدید با تایید پسوورد مقایرت دارد",
            })
        }



    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا فیلد هارو به درستی وارد کنید",
        })
    }


})


module.exports = adminRouter;