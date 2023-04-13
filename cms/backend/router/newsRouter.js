const express = require('express');
const newsRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const persianDate = require('persian-date')

newsRouter.get('/', (req, res) => {
    panelbaz_db.query('SELECT * FROM news', (err, newsResult) => {
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
                responseText: "تمام خبر ها",
                data: newsResult
            })
        }
    })
})

newsRouter.post('/submit/:newsSubTarget', (req, res) => {
    let transActionDate = ` ${new persianDate().hours()}:${new persianDate().minutes()}:${new persianDate().seconds()} ${new persianDate().years()} ${new persianDate([new persianDate().years(), new persianDate().month(), new persianDate().days()]).format('MMMM')} ${new persianDate().dates()}`;
    let newsSubTarget = req.params.newsSubTarget;
    let newsTargetPattern = /^[1-9][0-9]{0,7}|ANY$/g
    let checkValidTextPattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText1Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;

    if (newsTargetPattern.test(newsSubTarget)) {
        if (!checkValidTextPattern.test(req.body.title) && !checkValidText1Pattern.test(req.body.content)) {

            panelbaz_db.query(`INSERT INTO news(title, content, date, showUserContent, action_time) VALUES ('${req.body.title}','${req.body.content}','${transActionDate}','${req.params.newsSubTarget == "ANY" ? "ANY" : req.params.newsSubTarget}', ${Math.floor(new Date().getTime() / 1000)})`, (err, newsResult) => {
                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "خبر با موفقیت ثبت شد"
                    })
                }
            })
        }
        else {
            res.json({
                isOk: false,
                responseText: "خطا لطفا متن معتبر وارد کنید \n استفاده از کاراکتر های (\ ` ~ ' \"  < > ^ &) مجاز نیست",
            })
        }

    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا در ارسال خبر",
        })
    }

})

newsRouter.post('/edit-news/:newsId', (req, res) => {
    let checkValidTextPattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText1Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;

    if (!checkValidTextPattern.test(req.body.title) && !checkValidText1Pattern.test(req.body.content)) {

        panelbaz_db.query(`UPDATE news SET title='${req.body.title}',content='${req.body.content}' WHERE id = ${req.params.newsId}`, (err, newsResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "خبر با موفقیت ویرایش شد"
                })
            }
        })
    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا متن معتبر وارد کنید \n استفاده از کاراکتر های (\ ` ~ ' \"  < > ^ &) مجاز نیست",
        })
    }


})

newsRouter.get('/remove-news/:newsId', (req, res) => {
    let newsIdPattern = /^[1-9][0-9]{0,8}$/g

    if (newsIdPattern.test(req.params.newsId)) {

        panelbaz_db.query(`DELETE FROM news WHERE id = ${req.params.newsId}`, (err, newsResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "خبر با موفقیت حذف شد",
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


module.exports = newsRouter;