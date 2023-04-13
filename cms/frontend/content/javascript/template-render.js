import { betweenNumber } from "./modules/funcs.js";
import { removeCookie, getCookie } from "./modules/funcs.js";


let mainUrl = 'http://localhost:4000/api';

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


function adminDashboardRender() {
    let dashboardTemp = `
    <h1 class="main-dashbaord-title">داشبورد ادمین</h1>
    
    <div class="container w-100">
    
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="main-dashboard-details">
                <div class="details-box-icon details-box-icon-color-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-wallet2" viewBox="0 0 16 16">
                        <path
                            d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                    </svg>
                </div>
                <div class="details-box-caption">
                    <p id="dashboard_all_total_income">50,000,000</p>
                    <span>مجموع درامد</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="main-dashboard-details">
                <div class="details-box-icon details-box-icon-color-2">
    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                        <path
                            d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                        <path
                            d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                        <path
                            d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                    </svg>
    
                </div>
                <div class="details-box-caption">
                    <p id="dashboard_today_transaction">50,000,000</p>
                    <span>تراکنشات امروز</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="main-dashboard-details">
                <div class="details-box-icon details-box-icon-color-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-cart" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                </div>
                <div class="details-box-caption">
                    <p id="dashboard_orders_count">50,000,000</p>
                    <span>تعداد سفارشات امروز</span>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="main-dashboard-details">
                <div class="details-box-icon details-box-icon-color-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-send" viewBox="0 0 16 16">
                        <path
                            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                </div>
                <div class="details-box-caption">
                    <p id="dashboard_today_tikets_count">50,000,000</p>
                    <span>تیکت های امروز</span>
                </div>
            </div>
        </div>
    </div>
    
    
    
    <div class="row px-2 px-md-5 mt-5 gy-4 gy-xxl-0">
        <div class="col-12 col-xxl-4">
            <div class="dashbaord-all-sell-box">
    
                <div class="circular-progress" data-inner-circle-color="#212128" data-percentage="70"
                    data-progress-color="crimson" data-bg-color="#2b2b33">
                    <div class="inner-circle"></div>
                    <p class="percentage">0%</p>
                </div>
    
                <p class="dashbaord-all-sell-box-title">کل تراکنشات تا به امروز</p>
                <h2 class="dashbaord-all-sell-box-price">150,000,000</h2>
                <p class="dashbaord-all-sell-desc">عناصر عنوان سنتی به گونه ای طراحی شده اند که در گوشت
                    محتوای صفحه شما بهترین عملکرد را داشته باشند.</p>
    
                <div class="dashbaord-all-sell-table">
                    <div class="dashbaord-all-sell-box-table-rows">
                        <p>ماه گذشته</p>
                        <p>هفته گذشته</p>
                        <p>هدف</p>
                    </div>
                    <div class="dashbaord-all-sell-box-table-datas">
                        <p id="previous_month_income">1,000,000</p>
                        <p id="previous_week_income">10,000,000</p>
                        <p id="income_target">150,000,000</p>
                    </div>
                </div>
    
    
            </div>
        </div>
        <div class="col-12 col-xxl-8">
    
            <!-- Slider main container -->
            <div class="swiper">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper w-100">
                    <!-- Slides -->
    
                    <div class="swiper-slide">
                        <canvas id="myChart"></canvas>
                    </div>
                    <div class="swiper-slide">
                        <canvas id="myChart1"></canvas>
                    </div>
                    <div class="swiper-slide">
                        <canvas id="myChart3"></canvas>
                    </div>
    
    
                </div>
                <!-- If we need pagination -->
                <div class="swiper-pagination"></div>
    
                <!-- If we need scrollbar -->
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
    </div>
    
    
    <div class="dashboard-table-wrapper mt-5">
        <h2 class="dashboard-table-title">کاربران اخیر</h2>
        <div class="dashboard-table-content">
            <table>
    
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>نام و نام خانوادگی</th>
                        <th>نام کاربری</th>
                        <th>جزئیات حساب</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
    
                <tbody id="dashboard-users-tbody">
                    <tr>
                        <td>1</td>
                        <td>ارش قدرتی</td>
                        <td>arash00_ksj</td>
                        <td><button class="btn-style btn-red-style" id="show-details-account-btn" data-bs-toggle="modal" href="#editUserModal" role="button">مشاهده
                                جزئیات</button></td>
                        <td class="text-success">فعال</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>کامی الفا</td>
                        <td>kamialpha0098</td>
                        <td><button class="btn-style btn-red-style" id="show-details-account-btn" data-bs-toggle="modal" href="#editUserModal" role="button">مشاهده
                                جزئیات</button></td>
                        <td class="text-danger">غیرفعال</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>محمد امین سعیدی راد</td>
                        <td>mmdreza98</td>
                        <td><button class="btn-style btn-red-style" id="show-details-account-btn" data-bs-toggle="modal" href="#editUserModal" role="button">مشاهده
                                جزئیات</button></td>
                        <td class="text-success">فعال</td>
                    </tr>
    
                </tbody>
    
            </table>
        </div>
    </div>
    
    <div class="dashboard-table-wrapper">
        <h2 class="dashboard-table-title">تیکت ها (5 تای اخر)</h2>
    
        <div class="dashboard-table-content">
            <table style="width: 110rem;">
        
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>کاربر</th>
                        <th>عنوان</th>
                        <th>محتوا</th>
                        <th>جزئیات</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>

                <tbody id="dashboard-tikets-tbody">

                    <tr>
                        <td>234</td>
                        <td>تلگرام</td>
                        <td>ممبر اد هیدن تلگرام</td>
                        <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketContent" role="button">دیدن محتوا</button></td>
                        <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketDetails" role="button">مشاهده</button></td>

                        <td><button class="btn btn-warning fs-4 text-light">درحال انتظار</button></td>
                        <td>
                            <button class="btn fs-4 btn-danger">بستن</button>
                            <button class="btn fs-4 btn-purple-style" data-bs-toggle="modal" href="#tiketAnswer" role="button">پاسخ</button>
                        </td>
                    </tr>

                </tbody>

            </table>
        </div>
    
    </div>
    
    </div>`;


    // setTimeout(() => {

    // chartGenerator('myChart2', '', [12, 11, 3, 5, 2, 3, 0, 8, 9, 3, 5, 7, 8], 'rgba(255, 229, 82, 0.37)', '#FFD700')
    // }, 1000)


    fetch(`${mainUrl}/admin-dashboard`)
        .then(res => res.json())
        .then(dashboardData => {

            if (dashboardData.isOk) {

                swiperSliderDashboardInit()


                let nowSecondDate = Math.floor(new Date().getTime() / 1000);
                let usersChartDataArray = [0, 0, 0, 0, 0, 0, 0];
                let ordersChartDataArray = [0, 0, 0, 0, 0, 0, 0];
                let transactionsChartDataArray = [0, 0, 0, 0, 0, 0, 0];

                function calculateTheNumberOfDataToday(dataArray) {
                    let calNumber = 0;
                    dataArray.forEach(calData => {
                        let secondsDifference = nowSecondDate - calData.action_time;

                        if (!Math.floor(secondsDifference / 86400)) {
                            calNumber++;
                        }
                    });

                    return calNumber;
                }


                let usersData = dashboardData.data.users;
                let todayUsersCount = calculateTheNumberOfDataToday(usersData);
                usersData.forEach(user => {
                    let secondsDifference = nowSecondDate - user.action_time;

                    if (Math.floor(secondsDifference / 604800) <= 7 && Math.floor(secondsDifference / 604800)) {
                        usersChartDataArray[Math.floor(secondsDifference / 604800) - 1] += 1;
                    }
                })

                let tiketsData = dashboardData.data.tikets;
                let todayTiketsCount = calculateTheNumberOfDataToday(tiketsData);

                let ordersData = dashboardData.data.orders;
                let todayOrdersCount = calculateTheNumberOfDataToday(ordersData);
                ordersData.forEach(order => {
                    let secondsDifference = nowSecondDate - order.action_time;

                    if (Math.floor(secondsDifference / 604800) <= 7 && Math.floor(secondsDifference / 604800)) {
                        ordersChartDataArray[Math.floor(secondsDifference / 604800) - 1] += 1;
                    }
                })

                let transactionsData = dashboardData.data.transactions;
                let todayTransactionsCount = calculateTheNumberOfDataToday(transactionsData);
                let allTransActionPrice = 0, monthSecondsCount = 0, weekSecondsCount = 0;

                transactionsData.forEach(transaction => {
                    allTransActionPrice += transaction.price
                    let secondsDifference = nowSecondDate - transaction.action_time;

                    if (Math.floor(secondsDifference / 604800) <= 7 && Math.floor(secondsDifference / 604800)) {
                        transactionsChartDataArray[Math.floor(secondsDifference / 604800) - 1] += 1;
                    }

                    if (Math.floor(secondsDifference / 2592000)) {
                        monthSecondsCount += transaction.price;
                        console.log(transaction);
                    }

                    if (Math.floor(secondsDifference / 604800)) {
                        weekSecondsCount += transaction.price;
                    }

                });


                chartGenerator('myChart', 'کاربران', [usersChartDataArray[0], usersChartDataArray[1], usersChartDataArray[2], usersChartDataArray[3], usersChartDataArray[4], usersChartDataArray[5], usersChartDataArray[6]], 'rgba(0, 212, 255, 0.25)', 'rgba(0, 212, 255, 1)')
                chartGenerator('myChart1', 'تراکنشات', [transactionsChartDataArray[0], transactionsChartDataArray[1], transactionsChartDataArray[2], transactionsChartDataArray[3], transactionsChartDataArray[4], transactionsChartDataArray[5], transactionsChartDataArray[6]], 'rgba(255, 107, 107, 0.28)', 'rgba(255, 102, 102, 0.96)')
                chartGenerator('myChart3', 'تعداد سفارشات', [ordersChartDataArray[0], ordersChartDataArray[1], ordersChartDataArray[2], ordersChartDataArray[3], ordersChartDataArray[4], ordersChartDataArray[5], ordersChartDataArray[6]], 'rgba(174, 82, 255, 0.29)', 'rgba(186, 109, 255, 1)')

                document.getElementById('dashboard_all_total_income').innerHTML = betweenNumber(allTransActionPrice);
                document.getElementById('dashboard_today_transaction').innerHTML = todayTransactionsCount + ' عدد ';
                document.getElementById('dashboard_orders_count').innerHTML = todayOrdersCount + ' عدد ';
                document.getElementById('dashboard_today_tikets_count').innerHTML = todayTiketsCount + ' عدد ';

                document.querySelector('.dashbaord-all-sell-box-price').innerHTML = betweenNumber(allTransActionPrice);
                document.getElementById('previous_month_income').innerHTML = betweenNumber(monthSecondsCount);
                document.getElementById('previous_week_income').innerHTML = betweenNumber(weekSecondsCount);


                circleProgressBar()


                // users table



                // users array handler
                const dashboardUserTbody = document.getElementById('dashboard-users-tbody');
                dashboardUserTbody.innerHTML = '';

                let recentUsersArray = usersData.slice(-5);

                if (recentUsersArray.length) {

                    recentUsersArray.forEach(user => {

                        dashboardUserTbody.innerHTML += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstname} ${user.lastname}</td>
                            <td>${user.username}</td>
                            <td><button class="btn-style btn-red-style" onclick='dashboardRecentUsersAction(${JSON.stringify(user)})' id="show-details-account-btn" data-bs-toggle="modal" href="#editUserModal" role="button">مشاهده
                                    جزئیات</button></td>
                            <td class="${user.status ? "text-success" : "text-danger"}">${user.status ? "فعال" : "غیرفعال"}</td>
                        </tr>
                        `;


                    })
                }


                // tiket table handler
                const dashboardTiketsTbody = document.getElementById('dashboard-tikets-tbody');
                dashboardTiketsTbody.innerHTML = '';

                let recentTiketsArray = tiketsData.slice(-5);

                if (recentTiketsArray.length) {

                    recentTiketsArray.reverse().forEach(tiket => {

                        dashboardTiketsTbody.innerHTML += `
                        <tr>
                            <td>${tiket.id}</td>
                            <td>${tiket.userID}</td>
                            <td>${tiket.title}</td>
                            <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketContent" role="button" onclick="dashboardTiketShowContent('${tiket.description}', '${tiket.id}')">دیدن محتوا</button></td>
                            <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketDetails" role="button" onclick='dashboardTiketShowDetails(${JSON.stringify(tiket)})'>مشاهده</button></td>
    
                            <td><button class="btn ${tiket.is_Active == 1 ? "btn-warning" : tiket.is_Active == 2 ? "btn-primary" : "btn-secondary"} fs-4 text-light">${tiket.is_Active == 1 ? "در حال انتظار" : tiket.is_Active == 2 ? "پاسخ داده شده" : "بسته شده"}</button></td>
                            <td>
                                ${tiket.is_Active ? `<button class="btn fs-4 btn-danger" onclick="dashboardCloseTiket('${tiket.id}')">بستن</button>` : `<button class="btn-style btn-red-style" style="font-size: 14px; padding:9px;" onclick="dashboardOpenTiket('${tiket.id}', '${tiket.answer}')">باز کردن</button>`}
                                
                                <button class="btn fs-4 btn-purple-style" data-bs-toggle="modal" href="#tiketAnswer" role="button" onclick="dashboardTiketAnswer('${tiket.id}' , '${tiket.answer}')">پاسخ</button>
                            </td>
                        </tr>
                        `;
                    })

                }




            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: dashboardData.responseText,
                })
            }


        })




    return dashboardTemp;
}

function adminDashboardUsersRender() {
    let usersTemp = `
    <h1 class="main-dashbaord-title">کاربران</h1>
    <div class="container w-100">
    
    <div class="dashboard-table-wrapper mt-5">
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="dashboard-table-title">کاربران</h2>
            <select name="" id="" class="me-3">
                <option value="" selected>انتخاب تعداد</option>
                <option value="">50</option>
                <option value="">100</option>
                <option value="">همه</option>
            </select>
        </div>
        <div class="dashboard-table-content">
            <table style="width: 110rem;">
    
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>نام و نام خانوادگی</th>
                        <th>نام کاربری</th>
                        <th>جزئیات حساب</th>
                        <th>وضعیت</th>
                    </tr>
                </thead>
    
                <tbody id="dashboard-user-tbody">
                    <tr>
                        <td>1</td>
                        <td>ارش قدرتی</td>
                        <td>arash00_ksj</td>
                        <td><button class="btn-style btn-red-style" id="show-details-account-btn"
                                data-bs-toggle="modal" href="#editUserModal" role="button">مشاهده
                                جزئیات</button></td>
                        <td class="text-success">فعال</td>
                    </tr>
                   
                    
    
                </tbody>
    
            </table>
        </div>
    </div>
    </div>`;

    fetch(`${mainUrl}/admin-users`)
        .then(res => res.json())
        .then(userData => {
            const dashboardUserTbody = document.getElementById('dashboard-user-tbody');
            dashboardUserTbody.innerHTML = '';

            if (userData.isOk && userData.data.length) {
                userData.data.forEach(user => {
                    dashboardUserTbody.innerHTML += `
                
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname} ${user.lastname}</td>
                    <td>${user.username}</td>
                    <td><button class="btn-style btn-red-style" id="show-details-account-btn"
                            data-bs-toggle="modal" href="#editUserModal" role="button" onclick='dashboardRecentUsersAction(${JSON.stringify(user)})'>مشاهده
                            جزئیات</button></td>
                    ${user.status == 1 ? `<td class="text-success">فعال</td>` : `<td class="text-danger">غیر فعال</td>`}
                </tr>
                `;
                })
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: userData.responseText,
                })
            }
        })

    return usersTemp;
}

function adminDashboardServicesRender() {
    let servicesTemp = `
    <h1 class="main-dashbaord-title">سرویس ها</h1>
    
    <div class="container w-100">
    
        <div class="row mt-5 px-5 g-3">
            <div class="col-12 col-xl-6">
                <div class="dashboard-table-wrapper w-100">
                    <h2 class="dashboard-table-title">افزودن دسته بندی جدید</h2>
    
                    <div class="dashboard-table-content">
                        <div class="services-add-categories">
                            <input type="text" class="input-style" placeholder="عنوان دسته بندی" id="add-categories-title-input">
                            <input type="text" class="input-style"
                                placeholder="تایتل دسته بندی (به انگلیسی)" id="add-categories-en-title-input">
                            <button class="btn-style btn-blue-style" onclick="addCategories()">ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <div class="dashboard-table-wrapper w-100">
                    <h2 class="dashboard-table-title">افزودن محصول جدید</h2>
    
                    <div class="dashboard-table-content">
                        <div class="services-add-product">
                            <input type="text" class="input-style" placeholder="عنوان محصول" id="add-products-title-input">
                            <input type="text" class="input-style" placeholder="تایتل محصول (به انگلیسی)" id="add-products-en-title-input">
                            <select name="" id="add-product-select-category">
                                <option value="null" selected>دسته بندی مرتبط</option>
                            </select>
    
                            <button class="btn-style btn-blue-style" onclick="addProducts()">افزودن محصول</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
                    <h2 class="dashboard-table-title">افزودن سرویس جدید</h2>
    
                    <div class="dashboard-table-content">
                        <div class="services-add-new-service">
                            <div class="flex-center w-100">
                                <input type="text" class="input-style" id="add-service-title-input" placeholder="عنوان سرویس">
                                <input type="text" class="input-style" id="add-service-price-input" placeholder="مبلغ">
                            </div>
                            <div class="flex-center w-100">
                                <input type="text" class="input-style" id="add-service-min-input" placeholder="حداقل تعداد">
                                <input type="text" class="input-style" id="add-service-max-input" placeholder="حداکثر تعداد">
                            </div>
                            <div class="flex-center w-100">
    
                                <select name="" id="add-services-select-category">
                                    <option value="" selected>دسته بندی مرتبط</option>
                                    <option value="">تلگرام</option>
                                    <option value="">اینستا</option>
                                    <option value="">یوتیوب</option>
                                </select>
    
                                <select name="" id="add-services-select-product">
                                    <option value="" selected>محصول مرتبط</option>
                                    <option value="">تلگرام</option>
                                    <option value="">اینستا</option>
                                    <option value="">یوتیوب</option>
                                </select>
                            </div>
                            <input type="text" class="input-style" placeholder="زمان تکمیلی" id="add-service-date-input">
    
                            <textarea class="textarea-style" name="" id="add-service-description-input" cols="52" rows="10"
                                placeholder="توضیحات سرویس"></textarea>
    
    
    
                            <button class="btn-style btn-blue-style" onclick="addServices()">افزودن سرویس</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    
    
        <div class="row px-5 g-3">
            <div class="col-12 col-xl-5">
                <div class="dashboard-table-wrapper w-100 h-100">
                    <h2 class="dashboard-table-title">دسته بندی ها</h2>
    
                    <div class="dashboard-table-content">
                        <table style="width: 40rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>عنوان</th>
                                    <th>عملیات</th>
    
                                </tr>
                            </thead>
    
                            <tbody id="dashboard-category-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>تلگرام</td>
                                    <td><button class="btn-style text-light bg-danger">حذف</button></td>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-7">
                <div class="dashboard-table-wrapper w-100 h-100">
                    <h2 class="dashboard-table-title">محصولات</h2>
                    <div class="dashboard-table-content">
                        <table style="width: 60rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>دسته بندی</th>
                                    <th>عنوان</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="dashboard-products-tbody">
                                <tr>
                                    <td>345</td>
                                    <td>تلگرام</td>
                                    <td>فالوور ایرانی اینستا</td>
                                    <td><button class="btn-style text-light bg-danger">حذف</button></td>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4 mx-auto">
                <div class="dashboard-table-wrapper w-100">
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">سرویس ها</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>دسته بندی</th>
                                    <th>محصول</th>
                                    <th>عنوان</th>
                                    <th>جزئیات سرویس</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="dashboard-services-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>تلگرام</td>
                                    <td>ممبر اد هیدن تلگرام</td>
                                    <td>ممبر فیک کایی 50 عالی</td>
                                    <td><button class="btn-style btn-gold-style">مشاهده</button></td>
                                    <th>
                                        <button class="btn fs-4 btn-secondary">غیرفعال کردن</button>
                                        <button class="btn fs-4 btn-danger">حذف</button>
                                    </th>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
    
    </div>
    `;


    fetch(`${mainUrl}/admin-services/services-data`)
        .then(res => res.json())
        .then(allServiceData => {


            const dashboardCategoryTbody = document.getElementById('dashboard-category-tbody');
            const dashboardProductsTbody = document.getElementById('dashboard-products-tbody');
            const dashboardServicesTbody = document.getElementById('dashboard-services-tbody')
            dashboardCategoryTbody.innerHTML = '';
            dashboardProductsTbody.innerHTML = '';
            dashboardServicesTbody.innerHTML = '';

            const addProductSelectCategory = document.getElementById('add-product-select-category')
            const addServicesSelectCategory = document.getElementById('add-services-select-category')
            const addServicesSelectProduct = document.getElementById('add-services-select-product')

            addProductSelectCategory.innerHTML = '<option value="null" selected>دسته بندی مرتبط</option>';
            addServicesSelectCategory.innerHTML = '<option value="null" selected>دسته بندی مرتبط</option>';
            addServicesSelectProduct.innerHTML = '<option value="null" selected>محصول مرتبط</option>';

            if (allServiceData.isOk) {

                if (allServiceData.data.categories.length) {

                    allServiceData.data.categories.forEach(category => {

                        dashboardCategoryTbody.innerHTML += `
                    
                            <tr>
                                <td>${category.id}</td>
                                <td>${category.title}</td>
                                <td><button class="btn-style text-light bg-danger" onclick="removeCategory('${category.id}')">حذف</button></td>
                            </tr>
                    
                        `;

                        addProductSelectCategory.innerHTML += `
                            <option value="${category.id}">${category.title}</option>
                        `;
                        addServicesSelectCategory.innerHTML += `
                            <option value="${category.id}">${category.title}</option>
                        
                        `;

                    })
                }

                if (allServiceData.data.products.length) {
                    allServiceData.data.products.forEach(product => {
                        dashboardProductsTbody.innerHTML += `
                        
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.category_name}</td>
                                <td>${product.title}</td>
                                <td><button class="btn-style text-light bg-danger" onclick="removeProduct('${product.id}')">حذف</button></td>
                            </tr>
                        `;

                        addServicesSelectProduct.innerHTML += `
                            <option value="${product.id}">${product.title}</option>
                        `;
                    })
                }

                if (allServiceData.data.services.length) {
                    allServiceData.data.services.forEach(service => {
                        dashboardServicesTbody.innerHTML += `
                        
                            <tr>
                                <td>${service.id}</td>
                                <td>${service.category_name}</td>
                                <td>${service.product_name}</td>
                                <td>${service.title}</td>
                                <td><button class="btn-style btn-gold-style" onclick='showServicesDetails(${JSON.stringify(service)})' data-bs-toggle="modal" href="#serviceDetails" role="button">مشاهده</button></td>
                                <th>
                                    ${service.status ? `<button class="btn fs-4 btn-secondary" onclick="disableService('${service.id}')">غیرفعال کردن</button>` : `<button class="btn fs-4 btn-primary" onclick="enableService('${service.id}')">فعال کردن</button>`}
                                    <button class="btn fs-4 btn-danger" onclick="removeServices('${service.id}')">حذف</button>
                                </th>
                            </tr>
                        `;
                    })
                }

            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: allServiceData.responseText,
                })
            }


        })

    return servicesTemp;
}

function adminDashboardOrdersRender() {
    let ordersTemp = `
    
    <h1 class="main-dashbaord-title">سفارش ها</h1>
    
    <div class="container w-100">
    
        <div class="row px-lg-5 g-3">
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">در انتظار لغو</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>دسته بندی</th>
                                    <th>محصول</th>
                                    <th>عنوان</th>
                                    <th>جزئیات</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="cancel-order-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>تلگرام</td>
                                    <td>ممبر اد هیدن تلگرام</td>
                                    <td>ممبر فیک کایی 50 عالی</td>
                                    <td><button class="btn-style btn-gold-style" data-bs-toggle="modal"
                                            href="#showOrderDetails" role="button">مشاهده</button></td>
                                    <th>
                                        <button class="btn fs-4 btn-danger">رد</button>
                                        <button class="btn fs-4 btn-purple-style">تایید</button>
                                    </th>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">سفارش ها</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>دسته بندی</th>
                                    <th>محصول</th>
                                    <th>عنوان</th>
                                    <th>جزئیات سفارش</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="all-order-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>تلگرام</td>
                                    <td>ممبر اد هیدن تلگرام</td>
                                    <td>ممبر فیک کایی 50 عالی</td>
                                    <td><button class="btn-style btn-gold-style" data-bs-toggle="modal"
                                            href="#showOrderDetails" role="button">مشاهده</button></td>
                                    <th>
                                        <button class="btn-style btn-blue-style" data-bs-toggle="modal"
                                            href="#orderAction" role="button">کلیک کنید</button>
                                    </th>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
    
    </div>
    `;


    fetch(`${mainUrl}/admin-orders`)
        .then(res => res.json())
        .then(orderResult => {

            if (orderResult.isOk && orderResult.data.orders.length && orderResult.data.ordersStatus.length) {
                let allOrderData = [];

                const cancelOrderTbody = document.getElementById('cancel-order-tbody');
                const allOrderTbody = document.getElementById('all-order-tbody');
                cancelOrderTbody.innerHTML = '';
                allOrderTbody.innerHTML = '';


                orderResult.data.orders.forEach(order => {

                    orderResult.data.ordersStatus.forEach(orderStatus => {
                        if (order.id == orderStatus.orderID) {
                            allOrderData.push({
                                orderData: order,
                                orderStatusDsta: orderStatus
                            })
                        }
                    })
                })

                console.log(allOrderData);
                allOrderData.forEach(orderItem => {
                    allOrderTbody.innerHTML += `
                
                <tr>
                    <td>${orderItem.orderData.id}</td>
                    <td>${orderItem.orderData.category_name}</td>
                    <td>${orderItem.orderData.product_name}</td>
                    <td>${orderItem.orderData.service_name}</td>
                    <td><button class="btn-style btn-gold-style" data-bs-toggle="modal" href="#showOrderDetails" role="button" onclick='showOrdersDetails(${JSON.stringify(orderItem)})'>مشاهده</button></td>
                    <th>
                        <button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#orderAction" role="button" onclick="orderAction('${orderItem.orderData.id}')">کلیک کنید</button>
                    </th>
                </tr>
                
                `;

                    if (orderItem.orderStatusDsta.canceling) {

                        cancelOrderTbody.innerHTML += `
                    <tr>
                        <td>${orderItem.orderStatusDsta.id}</td>
                        <td>${orderItem.orderData.category_name}</td>
                        <td>${orderItem.orderData.product_name}</td>
                        <td>${orderItem.orderData.service_name}</td>
                        <td><button class="btn-style btn-gold-style" data-bs-toggle="modal" href="#showOrderDetails" role="button" onclick='showOrdersDetails(${JSON.stringify(orderItem)})'>مشاهده</button></td>
                        <th>
                            <button class="btn fs-4 btn-danger" onclick="orderResolveCanclingStatus('${orderItem.orderData.id}')">رد</button>
                            <button class="btn fs-4 btn-purple-style" onclick="orderRejectCanclingStatus('${orderItem.orderData.id}')">تایید</button>
                        </th>
                    </tr>
    
                    `;
                    }

                })



            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: orderResult.responseText,
                })
            }
        })

    return ordersTemp;
}

function adminDashboardTiketsRender() {
    let tiketTemp = `
    <h1 class="main-dashbaord-title">تیکت ها</h1>
    
    <div class="container w-100">
    
        <div class="row px-lg-5 g-3">
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">تمام تیکت ها</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>کاربر</th>
                                    <th>عنوان</th>
                                    <th>محتوا</th>
                                    <th>جزئیات</th>
                                    <th>وضعیت</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="dashboard-tiket-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>تلگرام</td>
                                    <td>ممبر اد هیدن تلگرام</td>
                                    <td><button class="btn-style btn-blue-style" data-bs-toggle="modal"
                                        href="#tiketContent" role="button">دیدن محتوا</button></td>
                                    <td><button class="btn-style btn-blue-style" data-bs-toggle="modal"
                                            href="#tiketDetails" role="button">مشاهده</button></td>
    
                                    <td><button class="btn btn-warning fs-4 text-light">درحال انتظار</button></td>
                                    <td>
                                        <button class="btn fs-4 btn-danger">بستن</button>
                                        <button class="btn fs-4 btn-purple-style" data-bs-toggle="modal"
                                        href="#tiketAnswer" role="button">پاسخ</button>
                                    </td>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
    
        </div>
    
    
    </div>
    `;




    fetch(`${mainUrl}/admin-tikets`)
        .then(res => res.json())
        .then(tiketData => {
            const dashboardTiketTbody = document.getElementById('dashboard-tiket-tbody')
            dashboardTiketTbody.innerHTML = '';
            if (tiketData.isOk && tiketData.data.length) {

                tiketData.data.reverse().forEach(tiket => {

                    dashboardTiketTbody.innerHTML += `
                    <tr>
                        <td>${tiket.id}</td>
                        <td>${tiket.userID}</td>
                        <td>${tiket.title}</td>
                        <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketContent" role="button" onclick="dashboardTiketShowContent('${tiket.description}', '${tiket.id}')">دیدن محتوا</button></td>
                        <td><button class="btn-style btn-blue-style" data-bs-toggle="modal" href="#tiketDetails" role="button" onclick='dashboardTiketShowDetails(${JSON.stringify(tiket)})'>مشاهده</button></td>
        
                        <td><button class="btn ${tiket.is_Active == 1 ? "btn-warning" : tiket.is_Active == 2 ? "btn-primary" : "btn-secondary"} fs-4 text-light">${tiket.is_Active == 1 ? "در حال انتظار" : tiket.is_Active == 2 ? "پاسخ داده شده" : "بسته شده"}</button></td>
                        <td>
                            ${tiket.is_Active ? `<button class="btn fs-4 btn-danger" onclick="dashboardCloseTiket('${tiket.id}')">بستن</button>` : `<button class="btn-style btn-red-style" style="font-size: 14px; padding:9px;" onclick="dashboardOpenTiket('${tiket.id}', '${tiket.answer}')">باز کردن</button>`}
                            
                            <button class="btn fs-4 btn-purple-style" data-bs-toggle="modal" href="#tiketAnswer" role="button" onclick="dashboardTiketAnswer('${tiket.id}' , '${tiket.answer}')">پاسخ</button>
                        </td>
                    </tr>
                    `;
                })
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: tiketData.responseText
                })
            }
        })


    return tiketTemp
}

function adminDashboardTransactionRender() {
    let transactionTemp = `
    <h1 class="main-dashbaord-title">تراکنش ها</h1>
    
    <div class="container w-100">
    
        <div class="row px-lg-5 g-3">
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">تمام تراکنشها</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>کاربر</th>
                                    <th>تاریخ</th>
                                    <th>مبلغ</th>
                                    <th>اعتبار قبل شارژ</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
    
                            <tbody id="dasboard-transaction-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>
                                        <button class="btn-style btn-red-style mt-4">دیدن مشخصات</button>
                                    </td>
                                    <td>12 اسفند 1401 12:30</td>
                                    <td>130,000,000</td>
                                    <td>130,000,000</td>
                                    <td>
                                        <span class="text-success">موفق</span>
                                    </td>
                                </tr>
    
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
    
        </div>
    
    
    </div>
    `;


    fetch(`${mainUrl}/admin-transactions`)
        .then(res => res.json())
        .then(transResult => {
            const dasboardTransactionTbody = document.getElementById('dasboard-transaction-tbody')
            dasboardTransactionTbody.innerHTML = '';

            if (transResult.isOk && transResult.data.length) {
                transResult.data.reverse().forEach(transaction => {
                    dasboardTransactionTbody.innerHTML += `
                
                    <tr>
                        <td>${transaction.id}</td>
                        <td>
                            <button class="btn-style btn-red-style mt-4" onclick="showUserInfoModal('${transaction.userID}')" data-bs-toggle="modal" href="#showUserInfos" role="button">دیدن مشخصات</button>
                        </td>
                        <td>${transaction.date}</td>
                        <td>${betweenNumber(transaction.price)}</td>
                        <td>${transaction.description}</td>
                        <td>
                            ${transaction.status ? `<span class="text-success">موفق</span>` : `<span class="text-danger">ناموفق</span>`}
                        </td>
                    </tr>
                `;
                })
            }
        })

    return transactionTemp;
}

function adminDashboardNewsRender() {
    let newsTemp = `
    
    <h1 class="main-dashbaord-title">خبر ها</h1>
    
    <div class="container w-100">
    
        <div class="row px-lg-5 g-3">
            <div class="col-9 m-auto">
                <div class="dashboard-table-wrapper w-100">
                    <h2 class="dashboard-table-title">افزودن خبر جدید</h2>
    
                    <div class="dashboard-table-content">
                        <div class="news-add-new-message">
                            <input type="text" class="input-style" id="submit-news-title-input" placeholder="عنوان خبر">
                            <textarea class="textarea-style" name="" id="submit-news-content-inout" cols="40" rows="8"></textarea>
                            <div class="check-form-news-send">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="newsCheckBox"
                                        id="newsCheckBox-send-to-all" onchange="submitNewsCheckBoxAllUser(event)" checked>
                                    <label class="form-check-label" for="newsCheckBox-send-to-all">
                                        ارسال به همه
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="newsCheckBox"
                                        id="newsCheckBox-send-to-user" onchange="submitNewsCheckBoxOneUser(event)">
                                    <label class="form-check-label" for="newsCheckBox-send-to-user">
                                        ارسال به کاربر
                                    </label>
                                </div>
                            </div>
                            <div id="send-news-to-user">
                                <input type="text" class="input-style" id="submit-news-user-id-input" placeholder="شناسه کاربر">
                            </div>
                            <button class="btn-style btn-blue-style" onclick="submitNewsBtn()">ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">تمام خبرهای ثبت شده</h2>
                        <select name="" id="" class="me-3">
                            <option value="" selected>انتخاب تعداد</option>
                            <option value="">50</option>
                            <option value="">100</option>
                            <option value="">همه</option>
                        </select>
                    </div>
    
                    <div class="dashboard-table-content">
                        <table style="width: 110rem;">
    
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>کاربر</th>
                                    <th>عنوان</th>
                                    <th>محتوا</th>
                                    <th>تاریخ</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
    
                            <tbody id="news-table-tbody">
    
                                <tr>
                                    <td>234</td>
                                    <td>همه</td>
                                    <td>باز نشدن درب خونه خر</td>
                                    <td>
                                        <button class="btn-style btn-red-style" data-bs-toggle="modal" href="#newsContent" role="button">مشاهده</button>
                                    </td>
                                    <td>20 اسفند 1402 13:30</td>
                                    <td>
                                        <button class="btn btn-danger fs-4">حذف</button>
                                    </td>
                                </tr>
    
                            </tbody>
    
                        </table>
                    </div>
                </div>
            </div>
    
        </div>
    
    
    </div>
    `;


    fetch(`${mainUrl}/admin-news/`)
        .then(res => res.json())
        .then(newsData => {
            const newsTableTbody = document.getElementById('news-table-tbody');
            newsTableTbody.innerHTML = '';

            if (newsData.isOk && newsData.data.length) {
                newsData.data.reverse().forEach(news => {
                    newsTableTbody.innerHTML += `
                    <tr>
                        <td>${news.id}</td>
                        <td>${news.showUserContent == "ANY" ? " همه" : news.showUserContent}</td>
                        <td>${news.title}</td>
                        <td>
                            <button class="btn-style btn-red-style" data-bs-toggle="modal" href="#newsContent" role="button" onclick="showNewsContent('${news.content}', '${news.title}', '${news.id}')">مشاهده</button>
                        </td>
                        <td>${news.date}</td>
                        <td>
                            <button class="btn btn-danger fs-4" onclick="removeNews('${news.id}')">حذف</button>
                        </td>
                    </tr>
                `;
                })
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: newsData.responseText,
                })
            }
        })


    return newsTemp;
}

function adminEditInfo() {

    let adminTemp = `
    
    <h1 class="main-dashbaord-title">اطلاعات ادمین</h1>
    
    <div class="container w-100">
    
        <div class="row px-lg-5 g-3">
            <div class="col-12 m-auto">
                <div class="dashboard-table-wrapper w-100">
    
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="dashboard-table-title">مشاهده یا ویرایش اطلاعات</h2>
                      
                    </div>
    
                    <div class="dashboard-table-content">
                        <div class="admin-info-wrap w-100 text-center"> 
                            <div class="admin-profile-wrapper">
                                <input type="file" id="upload-admin-profile-input" name="file">
                                <img class="mt-1 mb-5 rounded-circle" src="content/img/admin.jpg" width="200" height="200" id="admin-info-profile">                            
                            </div>

                        
                            <form action="" class="edit-admin-form d-flex flex-column gap-3 m-auto">
                                <input class="input-style" id="admin-info-firstname-input" placeholder="نام">
                                <input class="input-style" id="admin-info-lastname-input" placeholder="نام خانوادگی">
                                <input class="input-style" id="admin-info-username-input" placeholder="نام کاربری">
                                <input class="input-style" id="admin-info-phone-input" placeholder="شماره موبایل">
                                <input class="input-style" id="admin-info-email-input" placeholder="ایمیل">
                                <input type="button" class="btn btn-style btn-blue-style p-2 mt-3 mx-auto" style="width: 23rem;" value="ویرایش" onclick="submitEditAdminInfo('${getCookie("panelbaz_admin")}')">
                            
                                <br>

                                <p class="text-start text-light" style="line-height:2.5rem; font-size: 1.5rem;">
                                    <span>تغییر رمز عبور </span>
                                    <br>
                                    <span class="text-danger">درصورتی که قصد تغییر ندارید خالی  بزارید * </span>
                                </p>

                                <input class="input-style mb-2" id="admin-info-current-passowrd-input" placeholder="رمز عبور فعلی">
                                <div class="w-100 flex-center gap-2">
                                    <input class="input-style w-100" id="admin-info-new-passowrd-input" placeholder="رمز عبور جدید">
                                    <input class="input-style w-100" id="admin-info-confitm-passowrd-input" placeholder="تکرار رمز عبور جدید">
                                </div>
                                <input type="button" class="btn btn-style btn-blue-style p-2 mt-2 mx-auto" style="width: 20rem;" value="تغییر رمز عبور" onclick="submitPasswordChangegAdmin('${getCookie("panelbaz_admin")}')">

                            </form>
                        </div>
                    </div>


                </div>
            </div>
    
        </div>
    
    
    </div>


    `;

    fetch(`${mainUrl}/admin-register/auth/${getCookie("panelbaz_admin")}`)
    .then(res => res.json())
    .then(userData => {
        console.log(userData);

        if (userData.isOk && userData.data.length){

            document.getElementById('admin-info-profile').src = decodeURIComponent(userData.data[0].profile);
            document.getElementById('admin-info-firstname-input').value = userData.data[0].firstname;
            document.getElementById('admin-info-lastname-input').value = userData.data[0].lastname;
            document.getElementById('admin-info-username-input').value = userData.data[0].username;
            document.getElementById('admin-info-phone-input').value = userData.data[0].phone;
            document.getElementById('admin-info-email-input').value = userData.data[0].email;
        }


    })

    return adminTemp;
}

function exitPanel(){
    let exitTemp = `
        <h1 class="main-dashbaord-title">خروج از پنل مدیریت</h1>
        
        `;
        QDialog.fire({
            title: 'ایا میخواهید از پنل مدیریت خارج شوید'
        })
        .then(exitRes => {
            console.log(exitRes);
            if (exitRes.isConfirmed){
                removeCookie("panelbaz_admin")
                location.reload();
            }
            else {
                history.back();
            }
        })

    return exitTemp;
}

export {
    adminDashboardRender,
    adminDashboardUsersRender,
    adminDashboardServicesRender,
    adminDashboardOrdersRender,
    adminDashboardTiketsRender,
    adminDashboardTransactionRender,
    adminDashboardNewsRender,
    adminEditInfo,
    exitPanel,
}


