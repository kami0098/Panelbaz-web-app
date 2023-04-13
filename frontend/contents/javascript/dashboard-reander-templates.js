let mainUrl = 'http://localhost:3000/api';
import { getCookie } from "./funcs.js";
import { betweenNumber } from "./funcs.js";
import { removeCookie } from "./funcs.js";
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    background: '#34343e',
    color: '#ddddde',

})

const QDialog = Swal.mixin({

    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر',
    background: '#34343e',
    color: '#ddddde',
})

const loadingElement = document.querySelector('.loading-fullscreen');



function dashboardCounterReanderTemp() {

    let dashboardCounter = `
        <section class="dashboard-count">
        
        <div class="dashboard-account-info">
        
           <div class="row g-4">
               <div class="col-12 col-md-3">
                   <div class="account-info-cover">
                       <img src="../contents/images/author.svg" width="120" alt="">
                       <p>نوع : کاربر عادی</p>
                   </div>
               </div>
               <div class="col-12 col-md-9">
                   <div class="row g-4">
                       <div class="col-12 col-sm-6 col-lg-4">
                           <div class="acoount-info-box acoount-info-tikets-box">
                               <h3 id="dashboard-tikets-count">0</h3>
                               <p>تیکت ها</p>
                           </div>
                       </div>
                       <div class="col-12 col-sm-6 col-lg-4">
                           <div class="acoount-info-box acoount-info-amounts-box">
                               <h3 id="dashboard-amount-value">138,0000 تومان</h3>
                               <p>میزان هزینه تا به الان</p>
                           </div>
                       </div>
                       <div class="col-12 col-sm-6 col-lg-4">
                           <div class="acoount-info-box acoount-info-orders-box">
                               <h3 id="dashboard-orders-count">15</h3>
                               <p>سفارشات</p>
                           </div>
                       </div>
                       <div class="col-12 col-sm-6 col-lg-4">
                           <div class="acoount-info-box acoount-info-inventorys-box">
                               <h3 id="dashboard-inventory-value">5,280 تومان</h3>
                               <p>موجودی فعلی</p>
                           </div>
                       </div>
        
                   </div>
               </div>
           </div>
        </div>
        
        <div class="dashboard-user-orders-status">
           <h2>امار سفارشات</h2>
           <div class="row g-4">
               <div class="col-12 col-md-6 col-lg-3">
                   <div class="user-order-status-box">
                       <div class="order-status-box-icon-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
                        </svg>
                       </div>
                       <div class="order-status-box-details-wrap">
                           
                           <span id="dashboard-order-doing">14</span>
                           <h4>درحال انجام</h4>
                       </div>
                   </div>
               </div>
               <div class="col-12 col-md-6 col-lg-3">
                   <div class="user-order-status-box">
                       <div class="order-status-box-icon-wrap">
                       <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                       <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                     </svg>
                       </div>
                       <div class="order-status-box-details-wrap">
                           
                           <span id="dashboard-order-completed">14</span>
                           <h4>تکمیل شده</h4>
                       </div>
                   </div>
               </div>
               <div class="col-12 col-md-6 col-lg-3">
                   <div class="user-order-status-box">
                       <div class="order-status-box-icon-wrap">
                           <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                               <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                           </svg>
                       </div>
                       <div class="order-status-box-details-wrap">
                           
                           <span id="dashboard-order-incompleted">14</span>
                           <h4>نیمه تمام</h4>
                       </div>
                   </div>
               </div>
               <div class="col-12 col-md-6 col-lg-3">
                   <div class="user-order-status-box">
                       <div class="order-status-box-icon-wrap">
                       <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                     </svg>
                       </div>
                       <div class="order-status-box-details-wrap">
                           
                           <span id="dashboard-order-canceled">14</span>
                           <h4>لغو شده</h4>
                       </div>
                   </div>
               </div>
               <div class="col-12 col-md-6 col-lg-3">
                   <div class="user-order-status-box">
                       <div class="order-status-box-icon-wrap">
                       <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                       <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                       <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                       <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                     </svg>
                       </div>
                       <div class="order-status-box-details-wrap">
                           
                           <span id="dashboard-order-canceling">14</span>
                           <h4>درحال لغو</h4>
                       </div>
                   </div>
               </div>
               
               <div class="col-12 col-md-6 col-lg-3">
                    <div class="user-order-status-box">
                        <div class="order-status-box-icon-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        </div>
                        <div class="order-status-box-details-wrap">
                            
                            <span id="dashboard-order-pending">14</span>
                            <h4>درحال پردازش</h4>
                        </div>
                    </div>
                </div>

           </div>
        </div>
        
        <div class="dashboard-user-tikets">
        
           <div class="user-tiket-box">
               <h3> تیکت ها(5 تیکت آخر)</h3>

               

               <div class="main-content-table-wrapper">


                <table class="main-content-table show-tikets-table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>محتوا</th>
                            <th>تاریخ</th>
                            <th>وضعیت</th>
                            
                        </tr>
                    </thead>
                    <tbody id="dashboard-counter-tikets">                       
                        
                    </tbody>
                    
                </table>

               
                </div>



            </div>
           <div class="user-news-box">
               <h3> اطلاعیه و اخبار</h3>
                <div class="main-content-table-wrapper">
                    <table class="main-content-table show-news-dashboard-table">
                        <thead>
                            <tr>
                                <th>شناسه</th>
                                <th>عنوان</th>
                                <th>محتوا</th>
                                <th>تاریخ</th>
                                
                            </tr>
                        </thead>
                        <tbody id="dashboard-counter-news">                       

                        </tbody>
                        
                    </table>
                </div>

            
            </div>
           
        </div>
        </section>`;

    fetch(`${mainUrl}/user-orders-status`, {
        method: "GET",
        headers: { authorization: getCookie("panelbaz_token").trim() }
    })
        .then(orderRes => orderRes.json())
        .then(orderStatusData => {
            console.log(orderStatusData, "ok");
            const dashboardOrderDoing = document.getElementById('dashboard-order-doing');
            const dashboardOrderCompleted = document.getElementById('dashboard-order-completed');
            const dashboardOrderincompleted = document.getElementById('dashboard-order-incompleted');
            const dashboardOrderCanceled = document.getElementById('dashboard-order-canceled');
            const dashboardOrderCanceling = document.getElementById('dashboard-order-canceling');
            const dashboardOrderPending = document.getElementById('dashboard-order-pending');

            if (orderStatusData.isOk && orderStatusData.userOrdersStatus.length) {
                let orderDoingCount = 0, orderCompletedCount = 0, orderIncompletedCount = 0, orderCanceledCount = 0, orderCanclingCount = 0, orderPendingCount = 0;

                orderStatusData.userOrdersStatus.forEach(orderItem => {

                    orderItem.doing ? orderDoingCount++ :
                        orderItem.completed ? orderCompletedCount++ :
                            orderItem.incompleted ? orderIncompletedCount++ :
                                orderItem.canceled ? orderCanceledCount++ :
                                    orderItem.canceling ? orderCanclingCount++ :
                                        orderPendingCount++;

                })

                dashboardOrderDoing.innerHTML = orderDoingCount;
                dashboardOrderCompleted.innerHTML = orderCompletedCount;
                dashboardOrderincompleted.innerHTML = orderIncompletedCount;
                dashboardOrderCanceled.innerHTML = orderCanceledCount;
                dashboardOrderCanceling.innerHTML = orderCanclingCount;
                dashboardOrderPending.innerHTML = orderPendingCount;

            }
            else if (orderStatusData.isOk && !orderStatusData.userOrdersStatus.length) {
                dashboardOrderDoing.innerHTML = '0';
                dashboardOrderCompleted.innerHTML = '0';
                dashboardOrderincompleted.innerHTML = '0';
                dashboardOrderCanceled.innerHTML = '0';
                dashboardOrderCanceling.innerHTML = '0';
                dashboardOrderPending.innerHTML = '0';
            }
            else if (!orderStatusData.isOk) {

                if (orderStatusData?.isAuthErr == true) {
                    removeCookie("panelbaz_token")
                }
                Toast.fire({
                    icon: 'error',
                    title: orderStatusData.responseText,
                })
            }

            fetch(`${mainUrl}/users/auth`, {
                method: "GET",
                headers: { authorization: getCookie("panelbaz_token").trim() }
            })
                .then(userRes => userRes.json())
                .then(userData => {
                    console.log(userData);
                    if (!userData.isOk) {
                        if (!userData.isAvalable) {
                            removeCookie("panelbaz_token")
                        }
                        Toast.fire({
                            icon: 'error',
                            title: userData.responseText,
                        })

                    }
                    else {


                        document.getElementById('dashboard-tikets-count').innerHTML = userData.responseText.tikets_count + " عدد";
                        document.getElementById('dashboard-amount-value').innerHTML = betweenNumber(userData.responseText.amount) + " تومان";
                        document.getElementById('dashboard-orders-count').innerHTML = userData.responseText.orders_count + " عدد";
                        document.getElementById('dashboard-inventory-value').innerHTML = betweenNumber(userData.responseText.inventory) + " تومان";
                        loadingElement.classList.remove('active')
                    }

                    fetch(`${mainUrl}/tikets`, {
                        method: "GET",
                        headers: { authorization: getCookie("panelbaz_token").trim() }
                    })
                        .then(tiketRes => tiketRes.json())
                        .then(tiketsData => {
                            if (tiketsData.isOk && tiketsData.tikets.length) {
                                let allTikets = tiketsData.tikets;
                                document.getElementById('dashboard-counter-tikets').innerHTML = '';


                                if (allTikets.length >= 5)
                                    allTikets = allTikets.slice(allTikets.length - 5)
                                
                                allTikets.slice(allTikets.length - 5).forEach(tiket => {
                                    console.log(tiket);
                                    document.getElementById('dashboard-counter-tikets').innerHTML += `
                                <tr>
                                    <td>${tiket.id}</td>
                                    <td>${tiket.title}</td>
                                    <td>
                                        <button data-bs-toggle="modal" href="#showTextContentModal" role="button" class="btn-style show-tikets-content-btn" onclick="dashboardShowTiketsContent('${tiket.description}')">دیدن محتوا</button>
                                    </td>
                                    <td>${tiket.date}</td>
                                    <td>
                                        <button data-bs-toggle="modal" href="#showTextContentModal" role="button" onclick="showDashboardTiketAnswer('${tiket.answer}')" class="btn-style show-tiket-status-btn ${tiket.is_Active == 0 ? "bg-dark" : tiket.is_Active == 1 ? "bg-warning" : "bg-primary"}">${tiket.is_Active == 0 ? "بسته شده " : tiket.is_Active == 1 ? "درحال انتظار" : "پاسخ داده شده<br> <span class='d-block mt-3 fs--1'>(مشاهده)</span>"}</button>
                                    </td>
                                </tr>
                            
                                `;
                                });

                            }
                            else if (tiketsData.isOk && !tiketsData.tikets.length) {
                                document.getElementById('dashboard-counter-tikets').innerHTML = '';
                            }
                            else if (!tiketsData.isOk) {
                                if (tiketsData?.isAuthErr == true) {
                                    removeCookie("panelbaz_token")
                                }

                                Toast.fire({
                                    icon: 'error',
                                    title: userData.responseText,
                                })
                            }
                            console.log(tiketsData);
                        })

                })
            
            fetch(`${mainUrl}/news/${getCookie("panelbaz_token")}`)
            .then(newsRes => newsRes.json())
            .then(newsData => {
                console.log(newsData);
                if (newsData.isOk){
                    const dashboardCounterNews = document.getElementById('dashboard-counter-news');
                    if(newsData.newsData.length){
                        newsData.newsData.forEach(news => {

                            dashboardCounterNews.innerHTML +=`
                            <tr>
                                <td>#${news.id}</td>
                                <td>${news.title}</td>
                                <td>
                                    <button data-bs-toggle="modal" href="#showTextContentModal" role="button" class="btn-style text-light bg-secondary" onclick="dashboardShowTiketsContent('${news.content}')">دیدن محتوا</button>
                                </td>
                                <td>${news.date}</td>
                            </tr>
                            
                            `;
                        })
                    }
                    else {
                        dashboardCounterNews.innerHTML = '';
                    }
                }
                else {

                }
            })


        })

    return dashboardCounter;
}

function recordOrdersReanderTemplate() {

    let recordOrderTemplate = `<section class="dashboard-record-orders">
<div class="main-card-content-section">

    <div class="main-card-content-section-header">
        <h4>ارسال سفارش تکی</h4>
    </div>
    <div class="main-card-content-section-body">
        <h2 class="record-order-title">ثبت سفارش به معنی قبول قوانین میباشد! اینجا کلیک کنید</h2>

        <div class="row mt-4">
            <div class="col-12 col-lg-7">
                <select class="form-select shadow-none record-order-select" id="record-order-select-product" aria-label="Default select example" onchange="recordOrderSelectProduct()">
                    <option selected>لطفا سرویس خورد نظر خود را انتخاب کنید</option>
                </select>
                <p class="order-select-title">لطفا سرویس مورد نظر خود انتخاب نمایید</p>
                <select class="form-select shadow-none record-order-select" id="record-order-select-services" aria-label="Default select example" onchange="recordOrderSelectServices()">
                    <option selected>لطفا سرویس خورد نظر خود را انتخاب کنید</option>
                </select>

                <form action="" class="record-order-form mt-5">
                    <p>لینک</p>
                    <input type="text" class="dashboard-input-style" id="record-order-link-input" placeholder="لینک رو وارد کنید">
                    <p id="record-order-number-count-label">تعداد</p>
                    <input type="text" class="dashboard-input-style" id="record-order-number-input" placeholder="تعداد مورد نیاز" onkeyup="recordOrderOnkeyup()">
                    <p class="mt-4">زمان حدودی تکمیل سفارش</p>
                    <input type="text" class="dashboard-input-style record-order-count-input" id="record-order-service-complete-time" value="39 دقیقه" disabled>
                </form>
                <div class="record-order-dont-inventory">موجودی کافی نیست</div>

                <div class="record-order-details-table-wrapper">

                    <div class="record-order-details-table">
                        <div>
                            <p>محصول</p>
                            <p>قیمت</p>
                        </div>
                        <div>
                            <p id="record-order-service-name">🏅 فالوور میکس کم ریزش | سرور طلایی × 34342	</p>
                            <p id="record-order-service-price">۶۱۱٬۹۷۴ تومان</p>
                        </div>
                        <div class="record-order-decrease-wallet-txt">
                            <p>کسر از کیف پول</p>
                            <p id="record-order-service-price-leftover">۵٬۱۸۰ تومان</p>
                        </div>
                        <div class="record-order-payment-wallet-txt">
                            <p>مبلغ قابل پرداخت	</p>
                            <p id="record-order-service-price-wallet">۶۰۶٬۷۹۴ تومان</p>
                        </div>
                        <div>
                            <p id="record-order-service-letters-price">به حروف: ششصد و شش هزار و هفتصد و نود و چهار تومان</p>
                        </div>
                    </div>



                    <div class="record-order-input-checkbox">
                        <input class="form-check-input" type="checkbox" value="" id="record-order-role-input">
                        <label class="form-check-label" for="record-order-role-input">
                            من قوانین و مقررات را خوانده و با آن موافقم.
                        </label>
                    </div>
                    
                    <button class="btn-style record-order-submit-btn" onclick="recordOrderSubmit()">ثبت سفارش</button>
                </div>


            </div>
            <div class="col-12 col-lg-5">
                <div class="record-order-detail-box mt-5 mt-lg-0">
                    <h3>توضیحات سرویس</h3>
                    <p>توضیحات مربوط به هر سرویس در این قسمت قرار خواهد گرفت</p>
                </div>
            </div>
        </div>
    </div>
</div>

</section>`;


    fetch(`${mainUrl}/services/all-products`)
        .then(res => res.json())
        .then(products => {

            const recordOrderSelectProduct = document.getElementById('record-order-select-product');
            recordOrderSelectProduct.innerHTML = '<option selected>لطفا سرویس خورد نظر خود را انتخاب کنید</option>';

            products.productsData.forEach(product => {
                recordOrderSelectProduct.innerHTML += `<option value="${product.id}">${product.title}</option>`;
            })

            loadingElement.classList.remove('active')
        })


    return recordOrderTemplate;
}

function inventoryIncreaseReanderTemplate() {



    let inventoryIncreaseTemplate = `
    <section class="dashboard-inventory-increase">
        <div class="main-card-content-section">

            <div class="main-card-content-section-header">
                <h4>افزایش موجودی</h4>
            </div>
            <div class="main-card-content-section-body">
                
                <div class="inventory-increase-content">
                    <div class="inventory-increase-details">
                        <p class="inventory-available-count">شما هم‌اکنون <span style="color: #f35353;" id="show-inventory-transaction-page">5,180</span> تومان موجودی در حساب خود دارید.</p>
                        <p class="inventory-minimum-withdrawal">حداقل میزان پرداخت: 1,000 تومان</p>
                        <p class="inventory-maximum-withdrawal">حداکثر میزان پرداخت: 10,000,000 تومان</p>

                    </div>
                
                    <form action="" class="inventory-increase-form">
                        <h3>افزایش موجودی حساب</h3>
                    
                        <div class="flex-center">
                            <input type="number" class="remove-number-input" id="inventory-increase-input">
                            <label for="inventory-increase-input">تومان</label>

                        </div>
                        
                        <p class="off-code-text">کوپن تخفیف دارید؟ <span class="off-code-btn">برای نوشتن کد اینجا کلیک کنید</span></p>
                    
                        <div class="off-code-wrapper">
                            <input type="text" placeholder="کد تخفیف : ">
                            <button class="btn-style">بررسی کد تخفیف</button>
                        </div>
                        
                        <div class="payment-gateway-wrapper">

                            <div class="zarinpal-payment-banner">
                                <img src="../contents/images/zarinpal-payment.svg" alt="">
                            </div>
                            <span>درگاه زرین پال</span>
                        </div>
                    
                        <button type="button" class="btn-style inventory-increase-btn" onclick="userTransAction('${getCookie('panelbaz_token').trim()}')">افزایش موجودی</button>
                    </form>
                </div>

            </div>
        </div>
    </section>`;

    

    fetch(`${mainUrl}/users/auth`, {
        method: "GET",
        headers: { authorization: getCookie("panelbaz_token").trim() }
    })
        .then(userRes => userRes.json())
        .then(userData => {
            console.log(userData);
            if (!userData.isOk) {
                if (!userData.isAvalable) {
                    removeCookie("panelbaz_token")
                }
                Toast.fire({
                    icon: 'error',
                    title: userData.responseText,
                })

            }
            else {
                document.getElementById('show-inventory-transaction-page').innerHTML = betweenNumber(userData.responseText.inventory);
                loadingElement.classList.remove('active');
                document.querySelector('.off-code-btn').addEventListener('click', ()=>{
                    document.querySelector('.off-code-wrapper').classList.add('active')
                })
            }
        })


        

    return inventoryIncreaseTemplate;
}

function allOrdersReanderTemplate() {
    let allOrdersTemplate = `<section class="all-orders">
    <div class="main-card-content-section">
    
        <div class="main-card-content-section-header">
            <h4>سفارش ها</h4>
        </div>
        <div class="main-card-content-section-body">
            <div class="main-content-table-wrapper all-orders-table-wrapper">
    
    
                <table class="main-content-table all-orders-table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>تاریخ ثبت</th>
                            <th>جزییات</th>
                            <th>وضعیت</th>
                            <th>عملیات ها</th>
                        </tr>
                    </thead>
                    <tbody id="dashboard-all-order-table-body">
    
                        <tr>
                            <td>23030</td>
                            <td>13 مهر 1401 10:30</td>
                        
                            <td>
                                <div class="all-order-table-details">
                                    <span>سرویس: </span>
                                    <span>لینک: @luxuryGN</span>
                                    <span>تعداد: 1000</span>
                                    <span>مبلغ: 12,000 تومان</span>
                                    <span>شروع شمارنده: 1677</span>
                                    <span>باقی مانده: 0</span>
                                </div>
                            </td>
                            <td>
                                <button class="btn-style order-status-btn">کامل شده</button>
                            </td>
                            <td>
                                <button>ow</button>
                                <button>pd</button>
                            </td>
    
                        </tr>
                        
                    </tbody>
                    
                </table>
            </div>
        </div>
    </div>
    </section>`;

    function setServiceStatusBtn(btn_text, class_style) {
        return `<button class='btn-style text-light ${class_style}'>${btn_text}</button>`
    }

    fetch(`${mainUrl}/orders/all-orders/${getCookie("panelbaz_token")}`)
        .then(res => res.json())
        .then(orders => {

            const dashboardAllOrderTableBody = document.getElementById('dashboard-all-order-table-body');
            dashboardAllOrderTableBody.innerHTML = '';
            orders.ordersData.reverse().forEach(order => {
                dashboardAllOrderTableBody.innerHTML += `
                <tr>
                    <td>#${order[0].id}</td>
                    <td>${order[0].date}</td>
                
                    <td>
                        <div class="all-order-table-details">
                            <span>سرویس: ${order[0].title}</span>
                            <span>لینک: ${order[0].link}</span>
                            <span>تعداد: ${betweenNumber(Number(order[0].count))}</span>
                            <span>مبلغ: ${betweenNumber(Number(order[0].price))} تومان</span>
                            <span>شروع شمارنده: ${order[1].start_count}</span>
                            <span>باقی مانده: ${order[1].left_over}</span>
                        </div>
                    </td>
                    <td>
                        ${order[1].doing ? setServiceStatusBtn("درحال انجام", "bg-info") :
                        order[1].completed ? setServiceStatusBtn("تکمیل شده", "order-status-btn") :
                            order[1].incompleted ? setServiceStatusBtn("نا تمام", "bg-secondary") :
                                order[1].canceled ? setServiceStatusBtn("لغو شده", "bg-danger") :
                                    order[1].canceling ? setServiceStatusBtn("درحال لغو", "bg-secondary") :
                                        setServiceStatusBtn("درحال پردازش", "bg-warning")
                    }
                        
                    </td>
                    <td>
                        <button class="btn btn-danger px-3 py-2 text-light" onclick="cancelOrderService('${order[1].orderID}')" style="font-size:15px;">لغو</button>
                        <button class="btn btn-primary px-3 py-2 text-light" onclick="editOrderService('${order[1].orderID}')" style="font-size:15px;">ویرایش</button>
                    </td>

                </tr>
            
            `;
            })

            loadingElement.classList.remove('active');
        })


    return allOrdersTemplate;
}

function selectServiceReanderTemplate() {
    let selectServciesTemplate = `<section class="services">

<div class="row flex-revese-column">
    <div class="col-12 col-lg-7">
        <div class="get-service-info mt-5 mt-lg-0">
            <h2 class="services-info-title">سرویس ها</h2>
            <p class="services-info-caption my-4">لطفا دسته مورد نظر خود را انتخاب کرده و بر روی دریافت خدمات کلیک کنید</p>
            <select class="form-select shadow-none record-order-select" aria-label="Default select example">
                <option selected>لطفا سرویس خورد نظر خود را انتخاب کنید</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <button class="btn-style get-services-btn">دریافت خدمات</button>
        </div>
    </div>
    <div class="col-12 col-lg-5">
        <div class="services-banner-wrap">
            <img src="../contents/images/new-ticket-help.png" alt="services-logo">
            <p>نکات مربوط به این قسمت را می توانید اینجا بخوانید</p>
        </div>
        <button class="btn-style show-all-services">مشاهده همه سرویس ها</button>
    </div>
</div>

<div class="main-card-content-section">
    <div class="main-card-content-section-header">
        <h4>سرویس ها</h4>
    </div>
    <div class="main-card-content-section-body">
        <div class="main-content-table-wrapper">


            <table class="main-content-table">
                <thead>
                    <tr>
           
                    </tr>
                </thead>
                <tbody>

                    <tr>


                    </tr>
                    
                </tbody>
                
            </table>
        </div>
    </div>
    
</div>
</section>`;

    return selectServciesTemplate;

}

function allServiceReanderTemplate() {

    let allServicesTemplate = `<section class="dashboard-all-services" id="all-services-card">

<div class="main-card-content-section">

    <div class="main-card-content-section-header">
        <h4>🎁 سرویس ویژه 🎁</h4>
    </div>
    <div class="main-card-content-section-body">
        
        <div class="main-content-table-wrapper">
            <table class="main-content-table dashboard-service-table">
                <thead>
                    <tr>
                        <th>شناسه </th>
                        <th>نام</th>
                        <th>توضیحات</th>
                        <th>قیمت هر 1000 عدد</th>
                        <th>حداقل / حداکثر</th>
                        <th>زمان تکمیلی</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>3456</td>
                        <td>🏅 فالوور میکس کم ریزش | سرور طلایی</td>
                        <td>
                            <button class="btn-style all-service-details-btn">توضیحات</button>
                        </td>
                        <td>17,820  تومان</td>
                        <td>300000/50</td>
                        <td>39 دقیقه</td>
                        <td class="services-table-status">فعال</td>
                        <td><button>add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>


<div class="main-card-content-section">

    <div class="main-card-content-section-header">
        <h4>🌟 - پکیج های اینستاگرام</h4>
    </div>
    <div class="main-card-content-section-body">
        
        <div class="main-content-table-wrapper">
            <table class="main-content-table dashboard-service-table">
                <thead>
                    <tr>
                        <th>شناسه </th>
                        <th>نام</th>
                        <th>توضیحات</th>
                        <th>قیمت هر 1000 عدد</th>
                        <th>حداقل / حداکثر</th>
                        <th>زمان تکمیلی</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>3456</td>
                        <td>🏅 فالوور میکس کم ریزش | سرور طلایی</td>
                        <td>
                            <button class="btn-style all-service-details-btn">توضیحات</button>
                        </td>
                        <td>17,820  تومان</td>
                        <td>300000/50</td>
                        <td>39 دقیقه</td>
                        <td class="services-table-status">فعال</td>
                        <td><button>add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>


<div class="main-card-content-section">

    <div class="main-card-content-section-header">
        <h4>👤 - فالوور میکس اينستاگرام</h4>
    </div>
    <div class="main-card-content-section-body">
        
        <div class="main-content-table-wrapper">
            <table class="main-content-table dashboard-service-table">
                <thead>
                    <tr>
                        <th>شناسه </th>
                        <th>نام</th>
                        <th>توضیحات</th>
                        <th>قیمت هر 1000 عدد</th>
                        <th>حداقل / حداکثر</th>
                        <th>زمان تکمیلی</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>3456</td>
                        <td>🏅 فالوور میکس کم ریزش | سرور طلایی</td>
                        <td>
                            <button class="btn-style all-service-details-btn">توضیحات</button>
                        </td>
                        <td>17,820  تومان</td>
                        <td>300000/50</td>
                        <td>39 دقیقه</td>
                        <td class="services-table-status">فعال</td>
                        <td><button>add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>

</section>`;

    fetch(`${mainUrl}/services`)
        .then(res => res.json())
        .then(allService => {
            const allServicesCard = document.getElementById('all-services-card');
            allServicesCard.innerHTML = '';

            let allServicesArray = Object.entries(allService.serviceProductsData);
            allServicesArray.forEach(category => {

                allServicesCard.innerHTML += `
            <div class="main-card-content-section">

                <div class="main-card-content-section-header">
                    <h4>${category[1][0]}</h4>
                </div>
                <div class="main-card-content-section-body">
                    
                    <div class="main-content-table-wrapper">
                        <table class="main-content-table dashboard-service-table">
                            <thead>
                                <tr>
                                    <th>شناسه </th>
                                    <th>نام</th>
                                    <th>توضیحات</th>
                                    <th>قیمت هر 1000 عدد</th>
                                    <th>حداقل / حداکثر</th>
                                    <th>زمان تکمیلی</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody id="${category[0]}">

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            
            `;

                let tbodyServiceElem = document.getElementById(category[0])
                tbodyServiceElem.innerHTML = '';

                category[1][1].forEach(product => {

                    tbodyServiceElem.innerHTML += `
                <tr>
                    <td>#${product.id}</td>
                    <td>${product.title}</td>
                    <td>
                        <button data-bs-toggle="modal" href="#showTextContentModal" role="button" class="btn-style all-service-details-btn" onclick="showAllServiceDetails('${product.description}')">توضیحات</button>
                    </td>
                    <td>${product.price}  تومان</td>
                    <td>${product.max}/${product.min}</td>
                    <td>${product.order_complete_date}</td>
                    <td class="services-table-status ${!product.status ? 'text-danger' : null}">${product.status ? 'فعال' : 'غیر فعال'}</td>
                </tr>
                `;
                })



            })
        })

    loadingElement.classList.remove('active');

    return allServicesTemplate;
}

function editProfileReanderTemplate() {
    let editProfileTemplate = `<section class="dashboard-edit-profile">
<div class="row">
    <div class="col-12 col-md-6">

        <div class="main-card-content-section">
            <div class="main-card-content-section-header">
                <h4> اطلاعات پایه</h4>
            </div>
            <div class="main-card-content-section-body">
            
                <form action="" class="dashboard-edit-profile-form">
                    <div class="row">
                        <div class="col-12">
                            <label for="">نام</label>
                            <input type="text" id="dashboard-firstname-input" class="dashboard-input-style">
                        </div>
                        <div class="col-12">
                            <label for="">نام خانوادگی</label>
                            <input type="text" id="dashboard-lastname-input" class="dashboard-input-style">
                        </div>
                        <div class="col-12">
                            <label for="">آدرس ایمیل</label>
                            <input type="text" id="dashboard-email-input" class="dashboard-input-style">
                        </div>
                        <div class="col-12">
                            <label for="">نام کاربری</label>
                            <input type="text" id="dashboard-username-input" class="dashboard-input-style">
                        </div>
                    </div>
                    <button type="button" class="btn-style" onclick="dashboadUpdateBasicUserInfo('${getCookie("panelbaz_token")}')">ویرایش اطلاعات</button>
                </form>

            </div>
        </div>
    </div>
    <div class="col-12 col-md-6">

        <div class="main-card-content-section">
            <div class="main-card-content-section-header">
                <h4>ویرایش اطلاعات کاربری</h4>
            </div>
            <div class="main-card-content-section-body">
            
                <form action="" class="dashboard-edit-profile-form">
                    <div class="row">
                        <div class="col-12">
                            <label for="">شماره مبایل</label>
                            <input type="text" id="dashboard-phone-input" class="dashboard-input-style">
                        </div>
                        <p class="edit-profile-form-caption">در صورتی که قصد تغییر ندارید خالی بگذارید</p>
                        <div class="col-12">
                            <label for="">گذرواژه جدید</label>
                            <input type="text" id="dashboard-first-pass-input" class="dashboard-input-style">
                        </div>

                        <div class="col-12">
                            <label for="">تکرار گذرواژه جدید</label>
                            <input type="text" id="dashboard-last-pass-input" class="dashboard-input-style">
                        </div>

                    </div>
                    <button type="button" class="btn-style" onclick="dashboardUpdateUserInfo('${getCookie("panelbaz_token")}')">ذخیره تغییرات</button>
                </form>


            </div>
        </div>
    </div>
</div>
</section>`;

    fetch(`${mainUrl}/users/auth`, {
        method: "GET",
        headers: { authorization: getCookie("panelbaz_token").trim() }
    })
        .then(res => res.json())
        .then(userData => {

            document.getElementById('dashboard-firstname-input').value = userData.responseText.firstname;
            document.getElementById('dashboard-lastname-input').value = userData.responseText.lastname;
            document.getElementById('dashboard-email-input').value = userData.responseText.email;
            document.getElementById('dashboard-username-input').value = userData.responseText.username;
            document.getElementById('dashboard-phone-input').value = "0" + userData.responseText.phone;

            loadingElement.classList.remove('active')
        })


    return editProfileTemplate;
}

function paymentsReanderTemplate() {
    let paymentsTemplate = `<section class="dashboard-payments">

    <div class="payment-section-details">
        <div class="payment-details-gateway-state">
            <p>همه</p>
            <div>4</div>
        </div>
        <div class="payment-details-all-state">
            <p>زرین پال</p>
            <div>4</div>
        </div>
    </div>
    
    <div class="main-card-content-section mt-4">
    
        <div class="main-card-content-section-header">
            <h4>پرداخت ها</h4>
        </div>
        <div class="main-card-content-section-body">
            
            <div class="main-content-table-wrapper">
                <table class="main-content-table dashboard-payment-table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>درگاه</th>
                            <th>مبلغ پرداخت</th>
                            <th>اطلاعات کاربر</th>
                            <th>تاریخ</th>
                            <th>توضیحات</th>
                            <th>وضعیت</th>
                        </tr>
                    </thead>
                    <tbody id='dashboard-payments-table-body'>

                        
                    </tbody>
                </table>
            </div>
    
        </div>
    </div>
    </section> `;


    fetch(`${mainUrl}/transaction/${getCookie('panelbaz_token')}`)
        .then(res => res.json())
        .then(data => {
            let dashboardPaymentsTableBody = document.getElementById('dashboard-payments-table-body');
            if (data.isOk && data.paymentsData.length) {
                dashboardPaymentsTableBody.innerHTML = '';
                data.paymentsData.forEach(transaction => {
                    dashboardPaymentsTableBody.innerHTML += `
                        <tr>
                            <td>#${transaction.id}</td>
                            <td class="payment-table-gateway"><button class="btn-style">زرین پال</button></td>
                            <td>${betweenNumber(transaction.price)} تومان</td>
                            <td>${transaction.user_info}</td>
                            <td>${transaction.date}</td>
                            <td>${transaction.description}</td>
                            <td class="payment-table-status">${transaction.status == 1 ? "موفق" : "نا موفق"}</td>
                        </tr>

                    `;
                })
            }
            else if (data.isOk && !data.paymentsData.length) {
                dashboardPaymentsTableBody.innerHTML = '';
            }
            else if (!data.isOk) {
                if (data?.isAuthErr) {
                    removeCookie("panelbaz_token");
                }
                Toast.fire({
                    icon: 'error',
                    title: data.responseText,
                })

            }

            loadingElement.classList.remove('active')

        })


    return paymentsTemplate;
}

function sendTiketReanderTemplate() {
    let sendTiketTemplate = `<section class="dashboard-send-tiket">
<div class="row flex-revese-column">
    <div class="col-12 col-lg-7">
        <div class="send-tiket-from-wrap mt-5 mt-lg-0">
            <h2>چگونه می‌توانیم به شما کمک کنیم؟</h2>
            <h4>درخواست خود را به صورت یک تیکت مطرح کنید تا کارشناسان ما در اسرع وقت، به آن پاسخ دهند.</h4>

            <form action="" class="send-tiket-from">
                <input type="text" class="dashboard-input-style" id="dashboard-title-tiket-input" placeholder="عنوان">
                <input type="number" class="dashboard-input-style remove-number-input" id="dashboard-order_id-tiket-input" placeholder="درصورت لزوم شناسه سفارش مرتبط (در غیر این صورت 0 رو وارد کنید)">
                <textarea name="" class="dashboard-input-style" id="dashboard-content-tiket-input" cols="30" rows="13"></textarea>

                <div class="send-tiket-form-btn">

                </div>
                
            </form>
        </div>
    </div>
    <div class="col-12 col-lg-5">
        <div class="send-tiket-details">
            <img src="../contents/images/new-ticket-help.png" alt="">
            <p>درخواست خود را با دقت وارد کنید تا کارشناسان ما بتوانند پاسخ کاملی را برای شما ارسال نمایند.</p>
            <p>ایجاد یک تیکت برای هر موضوع کافی است. لطفاً از تکرار یک مساله پرهیز کنید.</p>
            <p>ارائه تصویر یا فایل مرتبط با موضوع، می‌تواند به بررسی دقیق‌تر درخواست شما کمک کند</p>
            <p>فایل شما باید حجمی کمتر از 3 مگابایت داشته باشد.</p>
            <p>فرمت های رایج متنی، تصویری و فشرده مجاز می باشد.</p>
            <p>استفاده از کاراکتر های ^ ' ^ < > " & ~ در متن غیرمجاز است</p>
        </div>
    </div>
</div>
</section>`;



    fetch(`${mainUrl}/users/auth`, {
        method: "GET",
        headers: { authorization: getCookie("panelbaz_token").trim() }
    })
        .then(userRes => userRes.json())
        .then(userData => {
            console.log(userData);
            if (!userData.isOk) {
                if (!userData.isAvalable) {
                    removeCookie("panelbaz_token")
                }
                Toast.fire({
                    icon: 'error',
                    title: userData.responseText,
                })

            }
            else {
                console.log(userData);
                document.querySelector('.send-tiket-form-btn').innerHTML = `
                    <input type="file" id="upload-file-btn" name="file">
                    <button class="btn-style" type="button" onclick="dashboardSendTiket('${getCookie("panelbaz_token").trim()}')" id="send-tiket-btn">ارسال تیکت</button>
                `;


                loadingElement.classList.remove('active');
                
                document.getElementById('upload-file-btn').addEventListener('change', (e)=>{
                    e.target.style.backgroundColor = '#1f94ce';
                })
            }
        })



    return sendTiketTemplate;
}

function tiketReanderTemplate() {
    let tiketsTemplate = ` <section class="dashboard-show-tikets">
<div class="main-card-content-section">

    <div class="main-card-content-section-header">
        <h4>تیکت های شما</h4>
    </div>
    <div class="main-card-content-section-body show-tikets-content-wrap">
        <div class="main-content-table-wrapper">


            <table class="main-content-table show-tikets-table">
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>عنوان</th>
                        <th>محتوا</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                        
                    </tr>
                </thead>
                <tbody id="dashboard-all-tikets-tbody">
                    
                    
                </tbody>
                
            </table>

            
        </div>
        <div class="open-new-tikets-circle-btn flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
        </div>
    </div>
</div>
</section>`;


    fetch(`${mainUrl}/tikets`, {
        method: 'GET',
        headers: { authorization: getCookie("panelbaz_token") }
    })
        .then(res => res.json())
        .then(tiketsData => {

            if (!tiketsData.isOk) {
                if (tiketsData?.isAuthErr) {
                    removeCookie("panelbaz_token")
                }

                Toast.fire({
                    icon: 'error',
                    title: tiketsData.responseText
                })

            }
            else {
                let showDashboardAllTikets = document.getElementById('dashboard-all-tikets-tbody');
                showDashboardAllTikets.innerHTML = '';

                let allTikets = tiketsData.tikets;
                allTikets.forEach(tiketItem => {

                    showDashboardAllTikets.innerHTML += `
                <tr>

                    <td>#${tiketItem.id}</td>
                    <td>${tiketItem.title}</td>
                    <td>
                        <button data-bs-toggle="modal" href="#showTextContentModal" role="button" class="btn-style show-tikets-content-btn" onclick="dashboardShowTiketsContent('${tiketItem.description}')">دیدن محتوا</button>
                    </td>
                    <td>${tiketItem.date}</td>
                    <td>
                        <button data-bs-toggle="modal" href="#showTextContentModal" role="button" onclick="showDashboardTiketAnswer('${tiketItem.answer}')" class="btn-style show-tiket-status-btn ${tiketItem.is_Active == 0 ? "bg-dark" : tiketItem.is_Active == 1 ? "bg-warning" : "bg-primary"}">${tiketItem.is_Active == 0 ? "بسته شده " : tiketItem.is_Active == 1 ? "درحال انتظار" : "پاسخ داده شده<br> <span class='d-block mt-3 fs--1'>(مشاهده)</span>"}</button>
                    </td>
                </tr>
                
                `;

                })

                loadingElement.classList.remove('active')

            }

        })



    return tiketsTemplate;
}

function logoutReanderTemplate() {

    QDialog.fire({
        title: 'ایا میخواهید از حسابتان خارج شوید ؟'
    })
    .then(logRes => {
        if (logRes.isConfirmed){
            removeCookie("panelbaz_token");
            location.reload()
        }
        else if (logRes.isDismissed){
            history.back()
        }
    })

    loadingElement.classList.remove('active');
    
    return ``;
}






export {
    dashboardCounterReanderTemp,
    recordOrdersReanderTemplate,
    inventoryIncreaseReanderTemplate,
    allOrdersReanderTemplate,
    selectServiceReanderTemplate,
    allServiceReanderTemplate,
    paymentsReanderTemplate,
    editProfileReanderTemplate,
    sendTiketReanderTemplate,
    tiketReanderTemplate,
    logoutReanderTemplate,



};