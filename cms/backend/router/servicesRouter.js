const express = require('express');
const servicesRouter = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');


// all data
servicesRouter.get('/services-data', (req, res) => {
    panelbaz_db.query(`SELECT * FROM categories`, (err, categoryResult) => {
        if (err) {
            res.json({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                data: []
            })
        }
        else {

            panelbaz_db.query(`SELECT products.id, products.title, products.model, categories.title AS category_name FROM products INNER JOIN categories ON categoryID = categories.id`, (err, productsResult) => {
                if (err) {
                    res.json({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                        data: []
                    })
                }
                else {

                    panelbaz_db.query(`SELECT services.id, categories.title AS category_name, products.title AS product_name, services.title,services.description, services.price, services.max, services.min, services.order_complete_date, services.status FROM services INNER JOIN categories ON categoryID = categories.id INNER JOIN products ON productID = products.id`, (err, servicesResult) => {
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
                                responseText: "تمام سرویس ها",
                                data: {
                                    categories: categoryResult,
                                    products: productsResult,
                                    services: servicesResult,
                                }
                            })
                        }
                    })

                }
            })


        }
    })
})



// catefory
servicesRouter.post('/categories/add', (req, res) => {

    let checkValidText1Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText2Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;

    if (!checkValidText1Pattern.test(req.body.title) && !checkValidText2Pattern.test(req.body.category_name)){
        panelbaz_db.query(`INSERT INTO categories(title, category_name) VALUES ('${req.body.title}','${req.body.category_name}')`, (err, categoryResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "دسته بندی با موفقیت اضافه شد",
                })
            }
        })

    }
    else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا فیلد هارو به درستی وارد کنید",
        })
    }

})

servicesRouter.get('/categories/remove/:catID', (req, res) => {
    let catIdPattern = /^[1-9][0-9]{0,9}$/g;
    if (catIdPattern.test(req.params.catID)){

        panelbaz_db.query(`DELETE FROM services WHERE categoryID = ${req.params.catID}`, (err, categoryResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                panelbaz_db.query(`DELETE FROM products WHERE categoryID = ${req.params.catID}`, (err, categoryResult) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            responseText: "خطا در پایگاه داده",
                        })
                    }
                    else {
                        panelbaz_db.query(`DELETE FROM categories WHERE id = ${req.params.catID}`, (err, categoryResult) => {
                            if (err) {
                                res.json({
                                    isOk: false,
                                    responseText: "خطا در پایگاه داده",
                                })
                            }
                            else {
                                res.json({
                                    isOk: true,
                                    responseText: "دسته بندی با موفقیت حذف شد",
                                })
                            }
                        })
                    }
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


// products

servicesRouter.post('/products/add/', (req, res) => {

    let checkValidText1Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText2Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let catIdPattern = /^[1-9][0-9]{0,9}$/g;

    if (!checkValidText1Pattern.test(req.body.title) && !checkValidText2Pattern.test(req.body.model) && catIdPattern.test(req.body.categoryID)){

        panelbaz_db.query(`INSERT INTO products(title, model, categoryID) VALUES ('${req.body.title}','${req.body.model}',${req.body.categoryID})`, (err, productsResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: " محصول با موفقیت اضافه شد",
                })
            }
        })
    } else {
        res.json({
            isOk: false,
            responseText: "خطا لطفا فیلد هارو به درستی وارد کنید",
        })
    }
})

servicesRouter.get('/products/remove/:productID', (req, res) => {
    let proIdPattern = /^[1-9][0-9]{0,9}$/g;

    if (proIdPattern.test(req.params.productID)){

        panelbaz_db.query(`DELETE FROM services WHERE productID = ${req.params.productID}`, (err, categoryResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                panelbaz_db.query(`DELETE FROM products WHERE id = ${req.params.productID}`, (err, productsResult) => {
                    if (err) {
                        res.json({
                            isOk: false,
                            responseText: "خطا در پایگاه داده",
                        })
                        console.log(err);
                    }
                    else {
                        res.json({
                            isOk: true,
                            responseText: " محصول با موفقیت حذف شد",
                        })
                    }
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



// services

servicesRouter.post('/services/add', (req, res) => {

    let catIdPattern = /^[1-9][0-9]{0,9}$/g;
    let proIdPattern = /^[1-9][0-9]{0,9}$/g;
    let checkValidText1Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText2Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let checkValidText3Pattern = /(\')|(\")|(\`)|(\~)|(\^)|(\<)|(\>)|(\&)/g;
    let pricePattern = /^[1-9][0-9]{0,9}$/g;
    let maxPattern = /^[1-9][0-9]{0,7}$/g;
    let minPattern = /^[1-9][0-9]{0,7}$/g;

    if (
        catIdPattern.test(req.body.categoryID) &
        proIdPattern.test(req.body.productID) &
        !checkValidText1Pattern.test(req.body.title) &
        !checkValidText2Pattern.test(req.body.description) &
        !checkValidText3Pattern.test(req.body.order_complete_date) &
        pricePattern.test(req.body.price) &
        maxPattern.test(req.body.max) &
        minPattern.test(req.body.min) 
    ){

        panelbaz_db.query(`INSERT INTO services(categoryID, productID, title, description, price, max, min, order_complete_date, status) VALUES (${req.body.categoryID},${req.body.productID},'${req.body.title}','${req.body.description}',${req.body.price},${req.body.max},${req.body.min},'${req.body.order_complete_date}',1)`, (err, servicesResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "سرویس با موفقیت اضافه شد",
                })
            }
        })
    }
    else {

        res.json({
            isOk: false,
            responseText: "خطا لطفا فیلد هارو به درستی وارد کنید",
        })
        
    }



})

servicesRouter.get('/services/remove/:serviceID', (req, res) => {
    let serviceIdPattern = /^[1-9][0-9]{0,9}$/g

    if (serviceIdPattern.test(req.params.serviceID)) {
        panelbaz_db.query(`DELETE FROM services WHERE id = ${req.params.serviceID}`, (err, servicesResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "سرویس با موفقیت حذف شد ",
                })
            }
        })
    } else {
        res.json({
            isOk: false,
            responseText: "خطا در اسال درخواست",
        })
    }

})

servicesRouter.get('/services/activate/:acID/:activateNumber', (req, res) => {
    let acIdPattern = /^[1-9][0-9]{0,9}$/g
    let activateNumberPattern = /^1|0$/g;
    if (acIdPattern.test(req.params.acID) && activateNumberPattern.test(req.params.activateNumber)) {

        panelbaz_db.query(`UPDATE services SET status=${req.params.activateNumber} WHERE id = ${req.params.acID}`, (err, servicesResult) => {
            if (err) {
                res.json({
                    isOk: false,
                    responseText: "خطا در پایگاه داده",
                })
            }
            else {
                res.json({
                    isOk: true,
                    responseText: "وضعیعت سرویس با موفقیت تغییر یافت",
                })
            }
        })
    } else {
        res.json({
            isOk: false,
            responseText: "خطا در اسال درخواست",
        })
    }
})

module.exports = servicesRouter