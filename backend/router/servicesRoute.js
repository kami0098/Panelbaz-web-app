const express = require('express');
const servciesRoute = express.Router();
const panelbaz_db = require('../db/panelbaz_DB.js');
const validate = require('../utils/validators');
const getUserInfo = require('../utils/getUserInfo');

servciesRoute.get('/', (req, res)=>{
    panelbaz_db.query('SELECT * FROM products', (err, productResult)=>{
        if (err){
            res.send({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                serviceProductsData: []
            });
        }
        else {
         
            panelbaz_db.query('SELECT * FROM services', (serviceErr, serviceResult)=>{
                if (serviceErr){
                    res.send({
                        isOk: false,
                        responseText: "خطا در پایگاه داده",
                        serviceProductsData: []
                    });
                }
                else {
                    let allServicesProducts = {
    
                    }
                    productResult.forEach(product => {

                        allServicesProducts[product.model] = [product.title, []];
    
                        serviceResult.forEach(service =>{
                            if (service.productID == product.id){
                                allServicesProducts[product.model][1].push(service);
                            }
                        })
                        
                    });

    
                    res.send({
                        isOk: true,
                        responseText: "تمام دسته بندی محصولات",
                        serviceProductsData: allServicesProducts
                    });
                }
            })
            
        }
    })

})

servciesRoute.get('/all-products', (req, res)=>{
    panelbaz_db.query('SELECT * FROM products', (err, products)=>{
        if (err) {
            res.send({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                productsData: []
            });
        }
        else {
            res.send({
                isOk: true,
                responseText: "تمام دسته بندی ها",
                productsData: products
            });
        }
    })
})

servciesRoute.get('/select-product-services/:productId', (req, res)=>{
    panelbaz_db.query(`SELECT * FROM services WHERE productID = ${req.params.productId}`, (err, services)=>{
        if (err) {
            res.send({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                servicesData: []
            });
        }
        else {
            res.send({
                isOk: true,
                responseText: "سرویس های مرتبط به دسته بندی انتخاب شده",
                servicesData: services
            });
        }
    })
})

servciesRoute.get('/select-service/:serviceId', (req, res)=>{
    panelbaz_db.query(`SELECT * FROM services WHERE id = ${req.params.serviceId}`, (err, service)=>{
        if (err) {
            res.send({
                isOk: false,
                responseText: "خطا در پایگاه داده",
                serviceData: []
            });
        }
        else {
            res.send({
                isOk: true,
                responseText: "سرویس با موفقیت انتخاب شد",
                serviceData: service
            });
        }
    })
})
module.exports = servciesRoute;
