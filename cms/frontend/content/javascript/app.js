
import {
    adminDashboardRender,
    adminDashboardUsersRender,
    adminDashboardServicesRender,
    adminDashboardOrdersRender,
    adminDashboardTiketsRender,
    adminDashboardTransactionRender,
    adminDashboardNewsRender,
    adminEditInfo,
    exitPanel
} from "./template-render.js";

import { removeCookie, getCookie } from "./modules/funcs.js";



// alerts 
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

window.addEventListener('load', () => {
    let cookie = getCookie("panelbaz_admin")
    if (cookie) {

        fetch(`${mainUrl}/admin-register/auth/${getCookie("panelbaz_admin")}`)
            .then(res => res.json())
            .then(adminData => {
                if (adminData.isOk && adminData.data.length) {

                    document.querySelector('.admin-header-info').innerHTML = `
                    ${adminData.data[0].firstname} ${adminData.data[0].lastname}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                    `;
                }
                else {
                    removeCookie("panelbaz_admin")
                    location.href = 'login.html';
                }
            })
    }
    else {
        location.href = 'login.html';
    }
})

const mainDashboard = document.querySelector('.main-dashboard')

let locationActionQuerys = [
    // {'query': '', 'template': adminDashboardRender},
    { 'query': 'users', 'template': adminDashboardUsersRender },
    { 'query': 'services', 'template': adminDashboardServicesRender },
    { 'query': 'orders', 'template': adminDashboardOrdersRender },
    { 'query': 'tikets', 'template': adminDashboardTiketsRender },
    { 'query': 'transactions', 'template': adminDashboardTransactionRender },
    { 'query': 'news', 'template': adminDashboardNewsRender },
    { 'query': 'admin-info', 'template': adminEditInfo },
    { 'query': 'admin-exit', 'template': exitPanel },
]


const mainAdmin = document.querySelector('.main-admin');
const adminMenu = document.querySelector('.admin-menu');

let isOpenMenu = true;

window.addEventListener('load', () => {
    let queryName = new URLSearchParams(location.search).get('action');
    if (!queryName) {
        mainDashboard.innerHTML = adminDashboardRender();
    }
    else {
        let pageResponse = locationActionQuerys.some((temp) => {
            if (temp.query == queryName) {
                mainDashboard.innerHTML = temp.template();
                document.querySelector('.admin-menu-head-list-item.active').classList.remove('active');
                document.querySelector(`.admin-menu-head-list-item[data-action=${temp.query}]`).classList.add('active');
                return true;
            }


        });

        if (!pageResponse) {
            // loadingElement.classList.remove('active');
            location.href = 'http://127.0.0.1:5500/cms/frontend/index.html';
        }

    }
})

const adminHeaderMenuBtn = document.querySelector('.admin-header-menu-btn');
const fullScreenEffect = document.querySelector('.full-screen-effect');

fullScreenEffect.addEventListener('click', () => {
    if (!isOpenMenu && window.innerWidth < 960) {
        mainAdmin.classList.remove('mobile-active')
        fullScreenEffect.classList.remove('active')
        isOpenMenu = !isOpenMenu;
    }
})
adminHeaderMenuBtn.addEventListener('click', () => {
    if (window.innerWidth < 960) {

        if (isOpenMenu) {
            adminHeaderMenuBtn.classList.remove('active')
            mainAdmin.classList.add('mobile-active')
            fullScreenEffect.classList.add('active')
        }
        else {
            adminHeaderMenuBtn.classList.add('active')
            mainAdmin.classList.remove('mobile-active')
            fullScreenEffect.classList.remove('active')
        }
    }
    else {

        if (isOpenMenu) {
            adminHeaderMenuBtn.classList.add('active')
            mainAdmin.classList.add('desktop-active')
        }
        else {
            adminHeaderMenuBtn.classList.remove('active')
            mainAdmin.classList.remove('desktop-active')
        }
    }


    isOpenMenu = !isOpenMenu;
})


// drop-down
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// user info tooltips
tippy('#showUserInfos-name', { content: 'نام و نام خانوادگی' });
tippy('#showUserInfos-email', { content: 'ایمیل' });
tippy('#showUserInfos-phone', { content: 'تلفن' });
tippy('#showUserInfos-username', { content: 'نام کاربری' });
tippy('#showUserInfos-inventory', { content: 'موجودی' });
tippy('#showUserInfos-amount', { content: 'مقدار شارژ شده تا به الان' });
tippy('#showUserInfos-tiket-count', { content: 'تعداد تیکت' });
tippy('#showUserInfos-order-count', { content: 'تعداد سفارش' });
tippy('#showUserInfos-status', { content: 'وضعیت' });

// order info tooltips
tippy("#showOrderInfos-category", { content: "دسته بندی" })
tippy("#showOrderInfos-product", { content: "محصول" })
tippy("#showOrderInfos-service", { content: "اسم سرویس" })
tippy("#showOrderInfos-date", { content: "تاریخ" })
tippy("#showOrderInfos-link", { content: "لینک" })
tippy("#showOrderInfos-count", { content: "تعداد سفارش" })
tippy("#showOrderInfos-price", { content: "مبلغ سفارش" })


