const express = require('express');
const userTiketRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');
const persianDate = require('persian-date')
const e = require('express');

const app = express();


userTiketRoute.get('/', (req, res) => {
    if (validate.sessionIdValidatro(req.headers.authorization)) {
        getUserInfo.getUserID(req.headers.authorization)
            .then(userId => {

                panelbaz_db.query(`SELECT * FROM tikets WHERE userID = ${userId[0].id}`, (err, result) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            tikets: [],
                            responseText: "خطا در پایگاه داده"
                        })
                    }
                    else {
                        res.json({
                            isOk: true,
                            tikets: result,
                            responseText: "تمام تیکت های شما"
                        })
                    }
                })
            })
    }
    else {
        res.json({
            isOk: false,
            tikets: [],
            isAuthErr: true,
            responseText: "خطا در اعتبار سنجی"
        })
    }
})

userTiketRoute.post('/:userToken', (req, res) => {
    let tiketInfo = req.body;
    if (validate.sessionIdValidatro(req.params.userToken)) {
        getUserInfo.getUserID(req.params.userToken)
            .then(userId => {

                tiketInfo = JSON.parse(tiketInfo.content);
                
                const tiketSqlActionFunc = function (file_url = null){
                    let transActionDate = ` ${new persianDate().hours()}:${new persianDate().minutes()}:${new persianDate().seconds()} ${new persianDate().years()} ${new persianDate([new persianDate().years(), new persianDate().month(), new persianDate().days()]).format('MMMM')} ${new persianDate().dates()}`;

                    let insertTiketQuery = `INSERT INTO tikets(userID, title, order_id, description, is_Active, date, action_time, file_url) VALUES (${userId[0].id},'${tiketInfo.title}', ${tiketInfo.orderID},'${tiketInfo.content}', 1, '${transActionDate}',${Math.round(Date.now() / 1000)}, '${file_url}')`;
                    panelbaz_db.query(insertTiketQuery, (err, result) => {
                        if (err) {
                            res.json({
                                isOk: false,
                                responseText: "خطا در پایگاه داده"
                            })
                        }
                        else {
    
    
                            panelbaz_db.query(`UPDATE users SET tikets_count = tikets_count + 1 WHERE id = ${userId[0].id}`, (upErr, upResult) => {
                                if (upErr) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا در پایگاه داده"
                                    })
                                }
                                else {
                                    res.json({
                                        isOk: true,
                                        responseText: "تیکت شما با موفقیت ثبت شد"
                                    })
                                }
                            })
    
                        }
                    })
                }

                if (req.files) {

                    let file = req.files.files;
                    let filename = file.name;
                    let fileFormat = filename.slice(-3)

                    if (fileFormat == "png" || fileFormat == "jpg" || fileFormat == "zip" || fileFormat == "rar") {
                        if (file.size <= 3145728){
                            
                            let fileSavePath = __dirname + '\\..\\uploads\\' + Math.round(Date.now() / 1000) + "-" + userId[0].id + "-" + filename;
                            file.mv(fileSavePath, (err) => {
                                if (err) {
                                    res.json({
                                        isOk: false,
                                        responseText: "خطا در ذخیره فایل"
                                    })
                                }
                                else {
                                    tiketSqlActionFunc(fileSavePath)
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
                    tiketSqlActionFunc();
                }



            })

    }
})


module.exports = userTiketRoute;


