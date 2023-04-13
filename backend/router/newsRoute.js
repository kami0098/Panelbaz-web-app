const express = require('express');
const newsRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');


newsRoute.get('/:userToken', (req, res)=>{
    if (validate.sessionIdValidatro(req.params.userToken)){
        getUserInfo.getUserID(req.params.userToken)
        .then(userID =>{

            panelbaz_db.query(`SELECT * FROM news WHERE showUserContent = "ANY" OR showUserContent = ${userID[0].id}`, (newsErr, newsResult)=>{
                if (newsErr){
                    res.json({
                        isOk: false,
                        responseText: 'خطا در پایگاه داده',
                        newsData : []
                    })
                }
                else {
                    
                    res.json({
                        isOk: true,
                        responseText: 'مشاهده اخبار',
                        newsData : newsResult
                    })
                }
            })

        })
    }
})



module.exports = newsRoute