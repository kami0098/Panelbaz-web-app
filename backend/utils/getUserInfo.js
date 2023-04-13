const panelbaz_db = require('../db/panelbaz_DB');


function getAuthUserInfo(sid){
    return new Promise((resolve, reject)=>{
        panelbaz_db.query(`SELECT firstname,lastname,email,phone,username,inventory,orders_count,tikets_count,amount,status FROM users WHERE user_token = ${panelbaz_db.escape(sid)}`, (err, result) => {
            if (err) {

                reject("خطا در پایگاه داده")
                console.log(err);
            }
            else {
                resolve(result);
            }
        })

    })
}

function getUserID (sid) {
    return new Promise((resolve, reject)=>{
        panelbaz_db.query(`SELECT id FROM users WHERE user_token = ${panelbaz_db.escape(sid)}`, (err, result) => {
            if (err) {

                reject("خطا در پایگاه داده")
                console.log(err);
            }
            else {
                resolve(result);
            }
        })

    })
}

module.exports = {
    getAuthUserInfo,
    getUserID
}