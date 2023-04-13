const express = require('express');
const userRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const bcrypt = require('bcryptjs');
const getUserInfo = require('../utils/getUserInfo');
const persianDate = require('persian-date')




userRouter.get('/', (req, res) => {

    panelbaz_db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
            res.send("err");
        }
        else {
            res.send(result);
        }
    })

})

userRouter.get('/auth', (req, res) => {
    let authSid = req.headers.authorization;

    if (validate.sessionIdValidatro(authSid)) {

        getUserInfo.getAuthUserInfo(authSid)
            .then(userResult => {

                if (userResult.length) {

                    res.json({
                        isOk: true,
                        isAvalable: true,
                        responseText: userResult[0],
                    })

                }
                else {
                    res.json({
                        isOk: false,
                        isAvalable: false,
                        responseText: "خطا در اعتبار سنجی",
                    })
                }

            })
            .catch(authErr => {
                res.json({
                    isOk: false,
                    isAvalable: true,
                    responseText: authErr
                })
            })

    }
    else {
        res.json({
            isOk: false,
            isAvalable: false,
            responseText: "خطا در اعتبار سنجی",
        })
    }
})

userRouter.post('/', (req, res) => {

    let userInfo = req.body;
    if (
        validate.firstNameValidator(userInfo.firstname) &&
        validate.lastNameValidator(userInfo.lastname) &&
        validate.usernameValidator(userInfo.username) &&
        validate.emailValidator(userInfo.email) &&
        validate.phoneNumberValidator(userInfo.phone) &&
        validate.passowrdValidator(userInfo.password)
    ) {

        panelbaz_db.query('SELECT username, phone, email FROM users', (err, users) => {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({
                    responseText: "خطا در پایگاه داده",
                    isOk: false,
                    isSqlErr: true,
                    token: ""
                }));
            }
            else {

                let isUserAvalable = users.some(userCheck => {
                    if (userCheck.username == userInfo.username || userCheck.phone == userInfo.phone || userCheck.email == userInfo.email) {
                        return true;
                    }
                });
                if (isUserAvalable) {
                    res.send(JSON.stringify({
                        responseText: "کاربری با اطلاعات وارد شده وجود دارد",
                        isOk: false,
                        isSqlErr: false,
                        token: ""
                    }));
                }
                else {

                    bcrypt.hash(userInfo.password, 10)
                        .then(function (passwordHashed) {
                            let transActionDate = ` ${new persianDate().hours()}:${new persianDate().minutes()}:${new persianDate().seconds()} ${new persianDate().years()} ${new persianDate([new persianDate().years(), new persianDate().month(), new persianDate().days()]).format('MMMM')} ${new persianDate().dates()}`;

                            let userInsertQuery = `INSERT INTO users(firstname, lastname, email, phone, username, password, user_token, action_time, date) VALUES ('${userInfo.firstname}','${userInfo.lastname}','${userInfo.email}',${userInfo.phone},'${userInfo.username}','${passwordHashed}','${req.sessionID}', ${Math.round(Date.now() / 1000)}, '${transActionDate}')`;

                            panelbaz_db.query(userInsertQuery, (err, result) => {
                                if (err) {
                                    console.log(err);

                                    res.send(JSON.stringify({
                                        responseText: "خطا در پایگاه داده",
                                        isOk: false,
                                        isSqlErr: true,
                                        token: ""
                                    }));
                                }
                                else {
                                    res.send(JSON.stringify({
                                        responseText: "ثبت نام با موفقیت انجام شد",
                                        isOk: true,
                                        isSqlErr: false,
                                        token: req.sessionID
                                    }));
                                }
                            })

                        })
                }



            }
        })


    }
    else {
        res.send(JSON.stringify({
            responseText: "اطلاعات وارد شده معتبر نیست",
            isOk: false,
            isSqlErr: false,
            token: ""
        }));
    }




})

userRouter.post('/login', (req, res) => {
    let userLoginInfo = req.body;


    if (validate.emailValidator(userLoginInfo.username.trim()) && validate.passowrdValidator(userLoginInfo.password.trim()) || validate.usernameValidator(userLoginInfo.username.trim()) && validate.passowrdValidator(userLoginInfo.password.trim())) {

        panelbaz_db.query(`SELECT password, user_token FROM users WHERE email = '${userLoginInfo.username}' OR username = '${userLoginInfo.username}'`, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    responseText: "خطا در پایگاه داده",
                    isOk: false,
                    token: "",
                });
            }
            else {
                if (result.length) {
                    bcrypt.compare(userLoginInfo.password, result[0].password).then((checkHashPassword) => {
                        if (checkHashPassword) {
                            res.json({
                                responseText: "با موفقیت وارد شدید",
                                isOk: true,
                                token: result[0].user_token
                            })
                        }
                        else {
                            res.json({
                                responseText: "گذرواژه اشتباه است",
                                isOk: false,
                                token: ""
                            })
                        }

                    });
                }
                else {
                    res.json({
                        responseText: " نام کاربری اشتباه است",
                        isOk: false,
                        token: ""
                    })
                }

            }
        })

    }
    else {
        res.json({
            responseText: "اطلاعات وارد شده معتبر نیست",
            isOk: false,
            token: ""
        })
    }


})


userRouter.post('/update-user/:userToken', (req, res) => {

    let updateUserInfo = req.body;
    let updateUserToken = req.params.userToken;


    if (validate.sessionIdValidatro(updateUserToken)) {
        if (updateUserInfo.isBasicInfoUpdate) {
            if (
                validate.firstNameValidator(updateUserInfo.firstname) &&
                validate.lastNameValidator(updateUserInfo.lastname) &&
                validate.usernameValidator(updateUserInfo.username) &&
                validate.emailValidator(updateUserInfo.email)

            ) {
                getUserInfo.getUserID(updateUserToken)
                    .then(userId => {
                        let userID = userId[0].id
                        panelbaz_db.query(`SELECT username, email FROM users WHERE id != ${userID}`, (err, users) => {
                            if (err) {

                                res.send(JSON.stringify({
                                    responseText: "خطا در پایگاه داده",
                                    isOk: false,
                                    isSqlErr: true,
                                }));
                            }
                            else {

                                let isUserAvalable = users.some(userCheck => {
                                    if (userCheck.username == updateUserInfo.username || userCheck.email == updateUserInfo.email) {
                                        return true;
                                    }
                                });

                                if (isUserAvalable) {
                                    res.send(JSON.stringify({
                                        responseText: "کاربری با اطلاعات وارد شده وجود دارد",
                                        isOk: false,
                                        isSqlErr: false,
                                    }));
                                }
                                else {



                                    let updateUserQuery = `UPDATE users SET firstname='${updateUserInfo.firstname}',lastname='${updateUserInfo.lastname}',email='${updateUserInfo.email}',username='${updateUserInfo.username}' WHERE id = ${userID}`;
                                    panelbaz_db.query(updateUserQuery, (upErr, upRes) => {
                                        if (upErr) {
                                            res.send(JSON.stringify({
                                                responseText: "خطا در پایگاه داده",
                                                isOk: false,
                                                isSqlErr: true,
                                            }));

                                        }
                                        else {
                                            res.send(JSON.stringify({
                                                responseText: "تغییرات پایه با موفقیت انجام شد",
                                                isOk: true,
                                                isSqlErr: false,
                                            }));
                                        }
                                    })
                                }



                            }
                        })

                    })




            }
            else {
                res.send(JSON.stringify({
                    responseText: "اطلاعات وارد شده معتبر نیست",
                    isOk: false,
                    isSqlErr: false,
                }));
            }
        }
        else {

            if (validate.phoneNumberValidator(updateUserInfo.phone)) {
                getUserInfo.getUserID(updateUserToken)
                    .then(userId => {
                        let userID = userId[0].id;
                        panelbaz_db.query(`SELECT phone FROM users WHERE id != ${userID}`, (err, users) => {
                            if (err) {

                                res.send(JSON.stringify({
                                    responseText: "خطا در پایگاه داده",
                                    isOk: false,
                                    isSqlErr: true,
                                }));
                            }
                            else {

                                let isUserAvalable = users.some(userCheck => {
                                    if (userCheck.phone == updateUserInfo.phone) {
                                        return true;
                                    }
                                });

                                if (isUserAvalable) {
                                    res.send(JSON.stringify({
                                        responseText: "کاربری با اطلاعات وارد شده وجود دارد",
                                        isOk: false,
                                        isSqlErr: false,
                                    }));
                                }
                                else {

                                    if (updateUserInfo.password == false) {
                                        let updateUserQuery = `UPDATE users SET phone=${updateUserInfo.phone} WHERE id = ${userID}`;
                                        panelbaz_db.query(updateUserQuery, (upErr, upRes) => {
                                            if (upErr) {
                                                res.send(JSON.stringify({
                                                    responseText: "خطا در پایگاه داده",
                                                    isOk: false,
                                                    isSqlErr: true,
                                                }));

                                            }
                                            else {
                                                res.send(JSON.stringify({
                                                    responseText: "تغییر شماره موبایل با موفقیت انجام شد",
                                                    isOk: true,
                                                    isSqlErr: false,
                                                }));
                                            }
                                        })
                                    }
                                    else {

                                        if (validate.passowrdValidator(updateUserInfo.password)) {
                                            bcrypt.hash(updateUserInfo.password, 10)
                                                .then(function (passwordHashed) {

                                                    let updateUserQuery = `UPDATE users SET phone=${updateUserInfo.phone}, password='${passwordHashed}' WHERE id = ${userID}`;
                                                    panelbaz_db.query(updateUserQuery, (upErr, upRes) => {
                                                        if (upErr) {
                                                            res.send(JSON.stringify({
                                                                responseText: "خطا در پایگاه داده",
                                                                isOk: false,
                                                                isSqlErr: true,
                                                            }));
                                                        }
                                                        else {
                                                            res.send(JSON.stringify({
                                                                responseText: "تغییرات اطلاعات کاربری با موفقیت انجام شد",
                                                                isOk: true,
                                                                isSqlErr: false,
                                                            }));
                                                        }
                                                    })
                                                })

                                        }
                                        else {

                                            res.send(JSON.stringify({
                                                responseText: "لطفا نام کاربری معتبری را وارد کنید",
                                                isOk: false,
                                                isSqlErr: false,
                                            }));
                                        }
                                    }

                                }



                            }
                        })

                    })




            }
            else {
                res.send(JSON.stringify({
                    responseText: "لطفا شماره موبایل معتبر وارد کنید",
                    isOk: false,
                    isSqlErr: false,
                }));
            }


        }




    }
    else {
        res.send(JSON.stringify({
            responseText: "خطا در اعتبار سنجی",
            isOk: false,
            isSqlErr: false,
            isAuthErr: true
        }));

    }



})


module.exports = userRouter;
