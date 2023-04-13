const express = require('express');
const transactionRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');

transactionRouter.get('/', (req, res)=>{
    panelbaz_db.query(`SELECT * FROM transactions`, (err, transactionResult)=>{
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
                responseText: "تمام تراکنش ها",
                data: transactionResult
            })
        }
    })
})


module.exports = transactionRouter