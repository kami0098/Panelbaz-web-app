import { getCookie } from "./funcs.js";
import { removeCookie } from "./funcs.js";

let mainUrl = 'http://localhost:3000/api';

import {
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
    logoutReanderTemplate


} from "./dashboard-reander-templates.js";

const mainContainerContent = document.querySelector('.main-container-content');


let locationActionQueryArray = [

    { 'query': 'record-order', 'template': recordOrdersReanderTemplate },
    { 'query': 'inventory-increase', 'template': inventoryIncreaseReanderTemplate },
    { 'query': 'all-orders', 'template': allOrdersReanderTemplate },
    { 'query': 'select-servcies', 'template': selectServiceReanderTemplate },
    { 'query': 'all-services', 'template': allServiceReanderTemplate },
    { 'query': 'payments', 'template': paymentsReanderTemplate },
    { 'query': 'edit-profile', 'template': editProfileReanderTemplate },
    { 'query': 'send-tiket', 'template': sendTiketReanderTemplate },
    { 'query': 'tikets', 'template': tiketReanderTemplate },
    { 'query': 'loguot', 'template': logoutReanderTemplate },
];

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
    // background: '#34343e',
    // color: '#ddddde',

})

window.addEventListener('load', () => {
    if (getCookie("panelbaz_token")) {
        const loadingElement = document.querySelector('.loading-fullscreen');
        loadingElement.classList.add('active');
        let queryName = new URLSearchParams(location.search).get('action');
        if (!queryName) {
            mainContainerContent.innerHTML = dashboardCounterReanderTemp();
        }
        else {
            let pageResponse = locationActionQueryArray.some((temp) => {
                if (temp.query == queryName) {
                    mainContainerContent.innerHTML = temp.template();
                    document.querySelector('.menu-list-item-link.active').classList.remove('active');
                    document.querySelector(`.menu-list-item-link[data-action=${temp.query}]`).classList.add('active');
                    return true;
                }
               

            });
            
            if (!pageResponse){
                loadingElement.classList.remove('active');
                location.href = 'http://127.0.0.1:5500/frontend/dashboard/error.html';
            }

        }



        fetch(`${mainUrl}/users/auth`, {
            method: "GET",
            headers: { authorization: getCookie("panelbaz_token") }
        })
            .then(res => res.json())
            .then(userData => {
                document.getElementById('show-inventory-menu').innerHTML = betweenNumber(userData.responseText.inventory) + " تومان ";
                document.getElementById('dashboard-header-user-infos').innerHTML = `
                ${ userData.responseText.firstname } ${ userData.responseText.lastname }

                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>

                `;

            })

    }
    else {
        location.href = '/frontend/index.html';
    }

})





// berger menu toggler

const togglerMenuBtn = document.getElementById('toggler-menu-btn');
const menuBtnFirstLine = document.querySelector('.menu-btn-first-line');
const menuBtnMiddleLine = document.querySelector('.menu-btn-middle-line');
const menuBtnLastLine = document.querySelector('.menu-btn-last-line');
const dashboardMenu = document.querySelector('.dashboard-menu');
const menuFullScreenBlur = document.querySelector('.menu-full-screen-blur');

let toggleMenuBtn = false;

function closeMenuAction() {
    menuBtnFirstLine.classList.remove('active');
    menuBtnMiddleLine.classList.remove('active');
    menuBtnLastLine.classList.remove('active');
    dashboardMenu.style.right = '-240px';
    menuFullScreenBlur.classList.remove('active');
}

function openMenuAction() {
    menuBtnFirstLine.classList.add('active');
    menuBtnMiddleLine.classList.add('active');
    menuBtnLastLine.classList.add('active');
    dashboardMenu.style.right = '0';
}

togglerMenuBtn.addEventListener('click', () => {
    if (toggleMenuBtn) {
        closeMenuAction();
    }
    else {
        openMenuAction();
        menuFullScreenBlur.classList.add('active');
    }
    toggleMenuBtn = !toggleMenuBtn;
})

menuFullScreenBlur.addEventListener('click', () => {
    closeMenuAction();
    toggleMenuBtn = !toggleMenuBtn;
})


// user drop down

document.querySelector('.dropbtn').addEventListener('click', () => document.getElementById("myDropdown").classList.toggle("show"));


window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// console.log(Num2persian(1250));


