const express = require('express');
const tiketRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');

tiketRouter.get('/', (req, res)=>{
    panelbaz_db.query(`SELECT * FROM tikets`, (err, tiketsData)=>{
        if (err){
            res.json({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                data: []
            })
        }
        else {
            res.json({
                isOk: true,
                responseText: "تمام تیکت ها",
                data: tiketsData
            })
        }
    })
})

tiketRouter.post('/edit-tiket/:tiketId', (req, res)=>{
    let checkValidTextPattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let tiketIdPattern = /^[1-9][0-9]{0,9}$/g

    if (tiketIdPattern.test(req.params.tiketId)){

        if (!checkValidTextPattern.test(req.body.content)){
            panelbaz_db.query(`UPDATE tikets SET description='${req.body.content}' WHERE id = ${req.params.tiketId}`, (err, tiketsData)=>{
                if (err){
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "محتوای تیکت کاربر با موفقیت تغییر یافت",
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
            responseText: "خطا در ارسال درخواست",
        })
    }
})

tiketRouter.post('/isActive-tiket/:tiketId', (req, res)=>{

    let tiketIdPattern = /^[1-9][0-9]{0,9}$/g
    let activeCheckPattern = /^0|1|2$/g
    
    if (tiketIdPattern.test(req.params.tiketId)){
        
        if (activeCheckPattern.test(req.body.is_Active)){

            panelbaz_db.query(`UPDATE tikets SET is_Active='${req.body.is_Active}' WHERE id = ${req.params.tiketId}`, (err, tiketsData)=>{
                if (err){
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "وضعیت تیکت با موفقیت تغییر یافت",
                    })
                }
            })
        }
        else {
            res.json({
                isOk: false,
                responseText: "خطا ورودی معتبر نیست",
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

tiketRouter.post('/answer-tiket/:tiketId', (req, res)=>{
    let tiketIdPattern = /^[1-9][0-9]{0,9}$/g
    let checkValidTextPattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;

    if (tiketIdPattern.test(req.params.tiketId)){
        
        if (!checkValidTextPattern.test(req.body.content)){
            
            panelbaz_db.query(`UPDATE tikets SET answer='${req.body.content}', is_Active=2 WHERE id = ${req.params.tiketId}`, (err, tiketsData)=>{
                if (err){
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                    })
                }
                else {
                    res.json({
                        isOk: true,
                        responseText: "پاسخ تیکت با موفقیت ثبت شد",
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
            responseText: "خطا در ارسال درخواست",
        })
    }

})

module.exports = tiketRouter