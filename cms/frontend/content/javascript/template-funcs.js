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
const Dialog = Swal.mixin({
    background: '#34343e',
    color: '#ddddde',
    confirmButtonText: 'تایید'
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

// chartjs init
function chartGenerator(element, title, datas, bgColor, brColor) {


    const config = {
        type: 'line',
        data: {
            labels: ['6 روز قبل', '5 روز قبل', '4 روز قبل', '3 روز قبل', '2 روز قبل', '1 روز قبل', 'امروز'],
            datasets: [{
                label: '',
                data: datas,
                borderWidth: 2,
                fill: true,
                backgroundColor: bgColor,
                tension: 0.3,
                pointStyle: false,
                borderColor: brColor
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    display: false

                },
                title: {
                    display: true,
                    text: title
                },
            },

            scales: {
                x: {
                    grid: {
                        display: false,
                    }
                }
            }

        },
    };


    let myChart = new Chart(
        document.getElementById(element),
        config
    );


}

// swiper init
function swiperSliderDashboardInit() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },


        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}

//circle progress bar
function circleProgressBar() {

    const circularProgress = document.querySelectorAll(".circular-progress");

    Array.from(circularProgress).forEach((progressBar) => {
        const progressValue = progressBar.querySelector(".percentage");
        const innerCircle = progressBar.querySelector(".inner-circle");
        let startValue = 0,
            endValue = Number(progressBar.getAttribute("data-percentage")),
            speed = 12,
            progressColor = progressBar.getAttribute("data-progress-color");

        const progress = setInterval(() => {
            startValue++;
            progressValue.textContent = `${startValue}%`;
            progressValue.style.color = `${progressColor}`;

            innerCircle.style.backgroundColor = `${progressBar.getAttribute(
                "data-inner-circle-color"
            )}`;

            progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
                }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
            if (startValue === endValue) {
                clearInterval(progress);
            }
        }, speed);
    });

}

// dashboard show or edit users 

function dashboardRecentUsersAction(userInfo) {

    const editUserModalFirstnameInput = document.getElementById('edit-user-modal-firstname-input');
    const editUserModalLastnameInput = document.getElementById('edit-user-modal-lastname-input');
    const editUserModalUsernameInput = document.getElementById('edit-user-modal-username-input');
    const editUserModalInventoryInput = document.getElementById('edit-user-modal-inventory-input');
    const editUserModalEmailInput = document.getElementById('edit-user-modal-email-input');
    const editUserModalOrderCountInput = document.getElementById('edit-user-modal-orderCount-input');
    const editUserModalTiketCountInput = document.getElementById('edit-user-modal-tiketCount-input');
    const editUserModalPhoneInput = document.getElementById('edit-user-modal-phone-input');
    const editUserModalTransactionCountInput = document.getElementById('edit-user-modal-transactionCount-input');
    const editUserModalAmountInput = document.getElementById('edit-user-modal-amount-input');
    const editUserModalDateInput = document.getElementById('edit-user-modal-date-input');

    editUserModalFirstnameInput.value = userInfo.firstname;
    editUserModalLastnameInput.value = userInfo.lastname;
    editUserModalUsernameInput.value = userInfo.username;
    editUserModalInventoryInput.value = userInfo.inventory;
    editUserModalEmailInput.value = userInfo.email;
    editUserModalOrderCountInput.value = userInfo.orders_count;
    editUserModalTiketCountInput.value = userInfo.tikets_count;
    editUserModalPhoneInput.value = "0" + userInfo.phone;
    editUserModalTransactionCountInput.value = userInfo.transactions_count;
    editUserModalAmountInput.value = userInfo.amount;
    editUserModalDateInput.value = userInfo.date;

    // user modal action

    document.getElementById('edit-user-btn').addEventListener('click', () => {
        QDialog.fire({
            title: 'ایا از ویرایش اطلاعات کاربر مطمعن هستید ؟  '
        }).then(editUserResponse => {
            if (editUserResponse.isConfirmed) {

                if (
                    editUserModalFirstnameInput.value.trim() != "" &
                    editUserModalLastnameInput.value.trim() != "" &
                    editUserModalEmailInput.value.trim() != "" &
                    editUserModalUsernameInput.value.trim() != "" &
                    editUserModalPhoneInput.value.trim() != "" &
                    editUserModalTransactionCountInput.value.trim() != "" &
                    editUserModalTiketCountInput.value.trim() != "" &
                    editUserModalOrderCountInput.value.trim() != "" &
                    editUserModalInventoryInput.value.trim() != "" &
                    editUserModalAmountInput.value.trim() != "" &
                    editUserModalDateInput.value.trim() != ""
                ) {


                    let newUserInfoUpdate = {
                        firstname: editUserModalFirstnameInput.value,
                        lastname: editUserModalLastnameInput.value,
                        username: editUserModalUsernameInput.value,
                        inventory: editUserModalInventoryInput.value,
                        email: editUserModalEmailInput.value,
                        orders_count: editUserModalOrderCountInput.value,
                        tikets_count: editUserModalTiketCountInput.value,
                        phone: editUserModalPhoneInput.value,
                        transactions_count: editUserModalTransactionCountInput.value,
                        amount: editUserModalAmountInput.value,
                        date: editUserModalDateInput.value,

                    }


                    fetch(`${mainUrl}/admin-users/update/${userInfo.id}`, {
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(newUserInfoUpdate)
                    })
                        .then(res => res.json())
                        .then(upUserResult => {
                            if (upUserResult.isOk) {
                                Toast.fire({
                                    icon: 'success',
                                    title: upUserResult.responseText
                                })
                            }
                            else {
                                Toast.fire({
                                    icon: 'error',
                                    title: upUserResult.responseText
                                })
                            }
                        })

                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: 'لطفا فیلد هارو به درستی پر کنید'
                    })
                }

            }
        })
    })
    document.getElementById('submit-user-news-btn').addEventListener('click', () => {

        const submitNewsModalTitle = document.getElementById('submit-news-modal-title')
        const submitNewsModalContent = document.getElementById('submit-news-modal-content')

        let newsInfo = {
            title: submitNewsModalTitle.value,
            content: submitNewsModalContent.value
        }

        if (submitNewsModalTitle.value.trim() != "" && submitNewsModalContent.value.trim() != "") {

            fetch(`${mainUrl}/admin-news/submit/${userInfo.id}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newsInfo)
            })
                .then(res => res.json())
                .then(newsUserResult => {
                    if (newsUserResult.isOk) {
                        Toast.fire({
                            icon: 'success',
                            title: newsUserResult.responseText
                        })
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: newsUserResult.responseText
                        })
                    }
                })
        }
    })
    document.getElementById('remove-user-btn').addEventListener('click', () => {
        QDialog.fire({
            title: 'ایا از حذف کاربر مطمعن هستید ؟'
        }).then(editUserResponse => {
            if (editUserResponse.isConfirmed) {
                fetch(`${mainUrl}/admin-users/delete/${userInfo.id}`)
                    .then(res => res.json())
                    .then(removeUserResult => {
                        if (removeUserResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: removeUserResult.responseText
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: removeUserResult.responseText
                            })
                        }
                    })
            }
        })
    })

}


// dashboard tikets show and submit answer

function dashboardTiketShowContent(content, tiketID) {

    const tiketContentModalBox = document.getElementById('tiket-content-modal-box')
    tiketContentModalBox.value = content;

    document.getElementById('edit-tiket-content-modal-btn').addEventListener('click', () => {

        if (tiketContentModalBox.value.trim != "") {
            console.log(tiketContentModalBox.value);
            fetch(`${mainUrl}/admin-tikets/edit-tiket/${tiketID}`, {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify({
                    content: tiketContentModalBox.value
                })
            })
                .then(res => res.json())
                .then(tiketResult => {
                    if (tiketResult.isOk) {
                        Toast.fire({
                            icon: 'success',
                            title: tiketResult.responseText
                        })
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: tiketResult.responseText
                        })
                    }

                })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'لطفا فیلد هارو به درستی پر کنید'
            })
        }


    })
}
function dashboardTiketShowDetails(tiketInfo) {

    const showTiketDetailsUserIdInput = document.getElementById('show-tiket-details-userId-input');
    const showTiketDetailsUserIdBtn = document.getElementById('show-tiket-details-userId-btn');
    const showTiketDetailsOrderIdInput = document.getElementById('show-tiket-details-orderId-input');
    const showTiketDetailsOrderIdBtn = document.getElementById('show-tiket-details-orderId-btn');
    const showTiketDetailsDateInput = document.getElementById('show-tiket-details-date-input');
    const showTiketDetailsFileInput = document.getElementById('show-tiket-details-file-input');

    showTiketDetailsUserIdInput.value = tiketInfo.userID;
    showTiketDetailsUserIdBtn.addEventListener('click', () => {
        showUserInfoModal(tiketInfo.userID);
    })

    showTiketDetailsOrderIdInput.value = tiketInfo.order_id == 0 ? "خالی" : tiketInfo.order_id;
    showTiketDetailsOrderIdBtn.addEventListener('click', () => {

        fetch(`${mainUrl}/admin-orders/order/${tiketInfo.order_id}`)
            .then(res => res.json())
            .then(orderData => {

                if (orderData.isOk && orderData.data.length) {
                    document.getElementById('showOrderInfos-category').value = orderData.data[0].categoryID;
                    document.getElementById('showOrderInfos-product').value = orderData.data[0].productID;
                    document.getElementById('showOrderInfos-service').value = orderData.data[0].serviceID;
                    document.getElementById('showOrderInfos-date').value = orderData.data[0].date;
                    document.getElementById('showOrderInfos-link').value = orderData.data[0].link;
                    document.getElementById('showOrderInfos-count').value = orderData.data[0].count;
                    document.getElementById('showOrderInfos-price').value = orderData.data[0].price;
                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: orderData.responseText
                    })
                }

            })


    })

    showTiketDetailsDateInput.value = tiketInfo.date;
    showTiketDetailsFileInput.value = tiketInfo.file_url == "null" ? "فایلی وجود ندارد" : tiketInfo.file_url;

}
function dashboardCloseTiket(tiketID) {
    QDialog.fire({
        title: 'ایا از بستن این تیکت اطمینان دارید ؟'
    })
        .then(closeTiketRes => {
            if (closeTiketRes.isConfirmed) {
                fetch(`${mainUrl}/admin-tikets/isActive-tiket/${tiketID}`, {
                    method: 'POST',
                    headers: { "Content-type": 'application/json' },
                    body: JSON.stringify({
                        is_Active: 0
                    })
                })
                    .then(res => res.json())
                    .then(closeTiketResult => {
                        if (closeTiketResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: closeTiketResult.responseText
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: closeTiketResult.responseText
                            })
                        }
                    })
            }
        })
}
function dashboardOpenTiket(tiketID, answer) {
    QDialog.fire({
        title: 'ایا از بازکردن این تیکت اطمینان دارید ؟'
    })
        .then(openTiketRes => {
            if (openTiketRes.isConfirmed) {
                fetch(`${mainUrl}/admin-tikets/isActive-tiket/${tiketID}`, {
                    method: 'POST',
                    headers: { "Content-type": 'application/json' },
                    body: JSON.stringify({
                        is_Active: answer == "null" ? 1 : 2
                    })
                })
                    .then(res => res.json())
                    .then(openTiketResult => {
                        if (openTiketResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: openTiketResult.responseText
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: openTiketResult.responseText
                            })
                        }
                    })
            }
        })
}

function dashboardTiketAnswer(tiketID, answer) {

    const tiketAnswerInputModal = document.getElementById('tiket-answer-input-modal')
    tiketAnswerInputModal.value = answer == "null" ? "" : answer;

    document.getElementById('tiket-answer-btn-modal').addEventListener('click', () => {

        if (tiketAnswerInputModal.value != "") {

            fetch(`${mainUrl}/admin-tikets/answer-tiket/${tiketID}`, {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify({
                    content: tiketAnswerInputModal.value
                })
            })
                .then(res => res.json())
                .then(tiketAsnwerResult => {
                    if (tiketAsnwerResult.isOk) {
                        Toast.fire({
                            icon: 'success',
                            title: tiketAsnwerResult.responseText
                        })
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: tiketAsnwerResult.responseText
                        })
                    }
                })
        }
    })

}

// dashboard transaction

function showUserInfoModal(userID) {

    fetch(`${mainUrl}/admin-users/user/${userID}`)
        .then(res => res.json())
        .then(userData => {
            if (userData.isOk && userData.data.length) {

                document.getElementById('showUserInfos-name').value = userData.data[0].firstname + " " + userData.data[0].lastname;
                document.getElementById('showUserInfos-email').value = userData.data[0].email;
                document.getElementById('showUserInfos-phone').value = userData.data[0].phone;
                document.getElementById('showUserInfos-username').value = userData.data[0].username;
                document.getElementById('showUserInfos-inventory').value = userData.data[0].inventory;
                document.getElementById('showUserInfos-amount').value = userData.data[0].amount;
                document.getElementById('showUserInfos-tiket-count').value = userData.data[0].tikets_count;
                document.getElementById('showUserInfos-order-count').value = userData.data[0].orders_count;
                document.getElementById('showUserInfos-status').value = userData.data[0].status;
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: userData.responseText
                })
            }

        })
}

// news

function submitNewsCheckBoxAllUser(e) {
    if (e.currentTarget.checked) {
        document.getElementById('send-news-to-user').classList.remove('active')
    }
}

function submitNewsCheckBoxOneUser(e) {
    if (e.currentTarget.checked) {
        document.getElementById('send-news-to-user').classList.add('active')
    }
}

function resetNewsInputs() {
    document.getElementById('submit-news-title-input').value = "";
    document.getElementById('submit-news-content-inout').value = "";
    document.getElementById('submit-news-user-id-input').value = "";
}
function submitNewsBtn() {


    const submitNewsTitleInput = document.getElementById('submit-news-title-input')
    const submitNewsContentInout = document.getElementById('submit-news-content-inout')
    const submitNewsUserIdInput = document.getElementById('submit-news-user-id-input')

    if (submitNewsTitleInput.value.trim() != "" && submitNewsContentInout.value.trim() != "") {

        let newsInfo = {
            title: submitNewsTitleInput.value.trim(),
            content: submitNewsContentInout.value.trim(),

        }

        submitNewsRequest = (to_user) => {
            fetch(`${mainUrl}/admin-news/submit/${to_user}`, {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify(newsInfo)
            })
                .then(res => res.json())
                .then(newsResult => {
                    if (newsResult.isOk) {
                        Toast.fire({
                            icon: 'success',
                            title: newsResult.responseText
                        })
                        resetNewsInputs();
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: newsResult.responseText
                        })
                    }
                })
        }


        if (document.getElementById('send-news-to-user').checked) {
            if (submitNewsUserIdInput.value.trim() != "" && !isNaN(submitNewsUserIdInput.value.trim())) {
                submitNewsRequest(submitNewsUserIdInput.value.trim())
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: 'خطا شناسه کاربر معتبر نیست'
                })
            }
        }
        else {
            submitNewsRequest("ANY")
        }

    }
    else {
        Toast.fire({
            icon: 'error',
            title: 'لطفا فیلد هارو به درستی پر کنید'
        })
    }



}

function showNewsContent(content, title, newsID) {

    const showNnewsTitleInput = document.getElementById('show-news-title-input');
    const showNnewsContentInput = document.getElementById('show-news-content-input');

    showNnewsTitleInput.value = title;
    showNnewsContentInput.value = content;


    document.getElementById('edit-news-btn').addEventListener('click', () => {
        if (showNnewsTitleInput.value.trim() && showNnewsContentInput.value.trim()) {
            let editNews = {
                title: showNnewsTitleInput.value.trim(),
                content: showNnewsContentInput.value.trim(),
            }

            fetch(`${mainUrl}/admin-news/edit-news/${newsID}`, {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify(editNews)
            })
                .then(res => res.json())
                .then(newsReesult => {
                    if (newsReesult.isOk) {
                        Toast.fire({
                            icon: 'success',
                            title: newsReesult.responseText
                        })
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: newsReesult.responseText
                        })
                    }
                })


        }
        else {
            Toast.fire({
                icon: 'error',
                title: "لطفا فیلد هارو به درستی پر کنید"
            })
        }
    })

}
function removeNews(newsID) {
    QDialog.fire({
        title: "ایا از حذف خبر اطمینان دارید؟ "
    })
        .then(removeRes => {
            if (removeRes.isConfirmed) {
                fetch(`${mainUrl}/admin-news/remove-news/${newsID}`)
                    .then(res => res.json())
                    .then(newsReesult => {
                        if (newsReesult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: newsReesult.responseText
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: newsReesult.responseText
                            })
                        }
                    })
            }


        })
}


// categories handler

function addCategories() {

    const addCategoriesTitleInput = document.getElementById('add-categories-title-input');
    const addCategoriesEnTitleInput = document.getElementById('add-categories-en-title-input');
    if (addCategoriesTitleInput.value.trim() != "" && addCategoriesEnTitleInput.value.trim() != "") {
        QDialog.fire({
            title: 'ایا از اضافه شدن دسته بندی اطمینان دارید؟'
        })
            .then(addCatRes => {
                if (addCatRes.isConfirmed) {

                    fetch(`${mainUrl}/admin-services/categories/add`, {
                        method: 'POST',
                        headers: { "Content-type": 'application/json' },
                        body: JSON.stringify({
                            title: addCategoriesTitleInput.value.trim(),
                            category_name: addCategoriesEnTitleInput.value.trim()
                        })

                    })
                        .then(res => res.json())
                        .then(categoryResult => {

                            if (categoryResult.isOk) {
                                Toast.fire({
                                    icon: 'success',
                                    title: categoryResult.responseText,
                                })
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: categoryResult.responseText,
                                })
                            }

                        })
                }
            })
    }
    else {
        Toast.fire({
            icon: 'error',
            title: 'لطفا فیلد هارو به درستی پر کنید',
        })
    }


}
function removeCategory(catID) {
    QDialog.fire({
        title: 'ایا از حذف این دسته بندی اطمینان دارید ؟ \n\n با حذف درسته بندی تمام محصولات و سرویس هایی که مرتبط هستند پاک میشوند'
    })
        .then(remCatRes => {
            if (remCatRes.isConfirmed) {

                fetch(`${mainUrl}/admin-services/categories/remove/${catID}`)
                    .then(res => res.json())
                    .then(catRemoveResult => {
                        if (catRemoveResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: catRemoveResult.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: catRemoveResult.responseText,
                            })
                        }
                    })
            }
        })
}

// products handler
function addProducts() {

    const addProductsTitleInput = document.getElementById('add-products-title-input');
    const addProductsEnTitleInput = document.getElementById('add-products-en-title-input');
    const addProductSelectCategory = document.getElementById('add-product-select-category');

    if (addProductsTitleInput.value.trim() != "" && addProductsEnTitleInput.value.trim() != "") {
        if (addProductSelectCategory.selectedOptions[0].value != "null") {
            QDialog.fire({
                title: 'ایا از اضافه کردن این محصول اطمینان دارید ؟'
            })
                .then(addProRes => {
                    if (addProRes.isConfirmed) {
                        fetch(`${mainUrl}/admin-services/products/add`, {
                            method: "POST",
                            headers: { "Content-type": 'application/json' },
                            body: JSON.stringify({
                                title: addProductsTitleInput.value.trim(),
                                model: addProductsEnTitleInput.value.trim(),
                                categoryID: addProductSelectCategory.selectedOptions[0].value,
                            })
                        })
                            .then(res => res.json())
                            .then(productResult => {
                                if (productResult.isOk) {
                                    Toast.fire({
                                        icon: 'success',
                                        title: productResult.responseText,
                                    })
                                }
                                else {
                                    Toast.fire({
                                        icon: 'error',
                                        title: productResult.responseText,
                                    })
                                }
                            })
                    }
                })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'لطفا درسته بندی مورد نظر رو انتخاب کنید',
            })
        }
    }
    else {
        Toast.fire({
            icon: 'error',
            title: 'لطفا فیلد هارو به درستی وارد کنید',
        })
    }

}
function removeProduct(productID) {
    QDialog.fire({
        title: 'ایا از حذف این محصول اطمینان دارید ؟ \n\n با حذف محصول تمام سرویس هایی که مرتبط هستند پاک میشوند'
    })
        .then(remProRes => {
            if (remProRes.isConfirmed) {

                fetch(`${mainUrl}/admin-services/products/remove/${productID}`)
                    .then(res => res.json())
                    .then(proRemoveResult => {
                        if (proRemoveResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: proRemoveResult.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: proRemoveResult.responseText,
                            })
                        }
                    })
            }
        })
}

// service handler
function addServices() {
    const addServiceTitleInput = document.getElementById('add-service-title-input')
    const addServicePriceInput = document.getElementById('add-service-price-input')
    const addServiceMinInput = document.getElementById('add-service-min-input')
    const addServiceMaxInput = document.getElementById('add-service-max-input')
    const addServicesSelectCategory = document.getElementById('add-services-select-category')
    const addServicesSelectProduct = document.getElementById('add-services-select-product')
    const addServiceDateInput = document.getElementById('add-service-date-input')
    const addServiceDescriptionInput = document.getElementById('add-service-description-input')

    if (
        addServiceTitleInput.value.trim() &&
        addServicePriceInput.value.trim() &&
        addServiceMinInput.value.trim() &&
        addServiceMaxInput.value.trim() &&
        addServiceDateInput.value.trim() &&
        addServiceDescriptionInput.value.trim()
    ) {
        if (addServicesSelectCategory.selectedOptions[0].value != "null" && addServicesSelectProduct.selectedOptions[0].value != "null") {
            QDialog.fire({
                title: 'ایا از اضافه کردن این سرویس اطمینان دارید ؟'
            })
                .then(addSerResult => {
                    if (addSerResult.isConfirmed) {

                        let newService = {
                            title: addServiceTitleInput.value.trim(),
                            price: addServicePriceInput.value.trim(),
                            min: addServiceMinInput.value.trim(),
                            max: addServiceMaxInput.value.trim(),
                            order_complete_date: addServiceDateInput.value.trim(),
                            description: addServiceDescriptionInput.value.trim(),
                            categoryID: addServicesSelectCategory.selectedOptions[0].value,
                            productID: addServicesSelectProduct.selectedOptions[0].value,
                        }

                        fetch(`${mainUrl}/admin-services/services/add`, {
                            method: 'POST',
                            headers: { "Content-type": 'application/json' },
                            body: JSON.stringify(newService)
                        })
                            .then(res => res.json())
                            .then(serviceResult => {
                                if (serviceResult.isOk) {
                                    Toast.fire({
                                        icon: 'success',
                                        title: serviceResult.responseText,
                                    })
                                }
                                else {
                                    Toast.fire({
                                        icon: 'error',
                                        title: serviceResult.responseText,
                                    })
                                }
                            })
                    }
                })
        } else {
            Toast.fire({
                icon: 'error',
                title: "لطفا دسته بندی و محصول مورد نظر رو انتخاب کنید",
            })
        }
    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا فیلد هارو به درستی وارد کنید",
        })
    }

}

function removeServices(serviceID) {
    QDialog.fire({
        title: 'ایا از حذف این سرویس اطمینان دارید ؟ '
    })
        .then(remSrvRes => {
            if (remSrvRes.isConfirmed) {
                fetch(`${mainUrl}/admin-services/services/remove/${serviceID}`)
                    .then(res => res.json())
                    .then(servRemResult => {
                        if (servRemResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: servRemResult.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: servRemResult.responseText,
                            })
                        }
                    })
            }
        })
}

function disableService(serviceID) {
    QDialog.fire({
        title: 'ایا از غیرفعال کردن این سرویس اطمینان دارید ؟'
    })
        .then(disableRes => {
            if (disableRes.isConfirmed) {
                fetch(`${mainUrl}/admin-services/services/activate/${serviceID}/0`)
                    .then(res => res.json())
                    .then(activateResult => {
                        if (activateResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: activateResult.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: activateResult.responseText,
                            })
                        }
                    })
            }
        })
}
function enableService(serviceID) {
    QDialog.fire({
        title: 'ایا از فعال کردن این سرویس اطمینان دارید ؟'
    })
        .then(enableRes => {
            if (enableRes.isConfirmed) {
                fetch(`${mainUrl}/admin-services/services/activate/${serviceID}/1`)
                    .then(res => res.json())
                    .then(activateResult => {
                        if (activateResult.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: activateResult.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: activateResult.responseText,
                            })
                        }
                    })
            }
        })
}

function showServicesDetails(service) {

    document.getElementById('service-details-modal-title-input').value = service.title;
    document.getElementById('service-details-modal-desc-input').value = service.description;
    document.getElementById('service-details-modal-min-input').value = service.min;
    document.getElementById('service-details-modal-max-input').value = service.max;
    document.getElementById('service-details-modal-date-input').value = service.order_complete_date;
    document.getElementById('service-details-modal-price-input').value = service.price;
}

// orders 

function showOrdersDetails(orderDatas) {
    console.log(orderDatas);

    const orderDetailsUserId = document.getElementById('order-details-user-id')
    const orderDetailsOrderId = document.getElementById('order-details-order-id');
    const orderDetailsDate = document.getElementById('order-details-date');
    const orderDetailsPrice = document.getElementById('order-details-price');
    const orderDetailsLink = document.getElementById('order-details-link');
    const orderDetailsCount = document.getElementById('order-details-count');
    const editOrderBtn = document.getElementById('edit-order-btn');

    orderDetailsUserId.value = orderDatas.orderData.userID
    orderDetailsOrderId.value = orderDatas.orderData.id
    orderDetailsDate.value = orderDatas.orderData.date
    orderDetailsPrice.value = orderDatas.orderData.price
    orderDetailsLink.value = orderDatas.orderData.link;
    orderDetailsCount.value = orderDatas.orderData.count;

    let servicePrice = Math.floor((orderDetailsPrice.value / orderDetailsCount.value)) * 1000;
    let totalPrice = (servicePrice * orderDetailsCount.value) / 1000;

    document.getElementById('order-details-show-user-info').addEventListener('click', () => {
        showUserInfoModal(orderDatas.orderData.userID)
    })


    editOrderBtn.addEventListener('click', () => {
        if (orderDetailsLink.value.trim() != "" && orderDetailsCount.value.trim() != "") {
            QDialog.fire({
                title: 'ایا از ویرایش این محصول اطمینان دارید ؟'
            })
                .then(editOrderRes => {

                    let newEditOrder = {
                        service_price: servicePrice,
                        price: totalPrice,
                        link: orderDetailsLink.value.trim(),
                        count: orderDetailsCount.value.trim(),
                    }

                    if (editOrderRes.isConfirmed) {
                        fetch(`${mainUrl}/admin-orders/edit-order/${orderDatas.orderData.id}`, {
                            method: "POST",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify(newEditOrder)
                        })
                            .then(res => res.json())
                            .then(orderRes => {
                                if (orderRes.isOk) {
                                    Toast.fire({
                                        icon: 'success',
                                        title: orderRes.responseText,
                                    })
                                }
                                else {
                                    Toast.fire({
                                        icon: 'error',
                                        title: orderRes.responseText,
                                    })
                                }
                            })
                    }
                })
        }
    })

}

function orderRejectCanclingStatus(orderID) {
    QDialog.fire({
        title: 'ایا از لغو این سفارش اطمینان دارید ؟'
    })
        .then(orderCancelRes => {
            if (orderCancelRes.isConfirmed) {

                fetch(`${mainUrl}/admin-orders/order-status/canceled/${orderID}/1`)
                    .then(res => res.json())
                    .then(cancelRes => {

                        if (cancelRes.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: cancelRes.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: cancelRes.responseText,
                            })
                        }

                    })
            }
        })
}
function orderResolveCanclingStatus(orderID) {
    QDialog.fire({
        title: 'ایا از رد کردن لغو این سفارش اطمینان دارید ؟'
    })
        .then(orderCancelRes => {
            if (orderCancelRes.isConfirmed) {

                fetch(`${mainUrl}/admin-orders/order-status/canceled/${orderID}/0`)
                    .then(res => res.json())
                    .then(cancelRes => {

                        if (cancelRes.isOk) {
                            Toast.fire({
                                icon: 'success',
                                title: cancelRes.responseText,
                            })
                        }
                        else {
                            Toast.fire({
                                icon: 'error',
                                title: cancelRes.responseText,
                            })
                        }

                    })
            }
        })
}

function orderAction(orderID) {
    let orderStatusInputs = document.querySelectorAll('.order-status-input')


    fetch(`${mainUrl}/admin-orders/order-get-status/${orderID}`)
        .then(res => res.json())
        .then(orderResult => {
            if (orderResult.isOk && orderResult.data.length) {
                Object.entries(orderResult.data[0]).forEach(statusItem => {
                    if (statusItem[1] == 1) {

                        document.querySelector(`.order-status-input[data-order-status=${statusItem[0]}]`).checked = true;

                    }
                })
            }

        })



    document.getElementById('edit-order-status-btn').addEventListener('click', () => {
        QDialog.fire({
            title: 'ایا از ویرایش وضعیت این سرویس اطمینان دارید ؟ '
        })
            .then(changeRes => {
                if (changeRes.isConfirmed) {
                    orderStatusInputs.forEach(statusInput => {
                        if (statusInput.checked) {

                            fetch(`${mainUrl}/admin-orders/order-status/${statusInput.dataset.orderStatus}/${orderID}`)
                                .then(res => res.json())
                                .then(changeStatusResult => {
                                    if (changeStatusResult.isOk) {

                                        Toast.fire({
                                            icon: 'success',
                                            title: changeStatusResult.responseText,
                                        })
                                    }
                                    else {
                                        Toast.fire({
                                            icon: 'error',
                                            title: changeStatusResult.responseText,
                                        })
                                    }
                                })

                        }
                    })
                }
            })
    })

}

// admin

function submitEditAdminInfo(admin_token) {
    const uploadAdminProfileInput = document.getElementById('upload-admin-profile-input');
    const adminInfoFirstnameInput = document.getElementById('admin-info-firstname-input');
    const adminInfoLastnameInput = document.getElementById('admin-info-lastname-input');
    const adminInfoUsernameInput = document.getElementById('admin-info-username-input');
    const adminInfoPhoneInput = document.getElementById('admin-info-phone-input');
    const adminInfoEmailInput = document.getElementById('admin-info-email-input');
    const adminInfoProfile = document.getElementById('admin-info-profile')

    let adminInfo = {
        firstname: adminInfoFirstnameInput.value.trim(),
        lastname: adminInfoLastnameInput.value.trim(),
        username: adminInfoUsernameInput.value.trim(),
        phone: adminInfoPhoneInput.value.trim(),
        email: adminInfoEmailInput.value.trim(),
        profile: adminInfoProfile.src,

    }

    const formData = new FormData();

    console.log(uploadAdminProfileInput.files[0]);
    formData.append("files", uploadAdminProfileInput.files[0])
    formData.append("content", JSON.stringify(adminInfo))

    fetch(`${mainUrl}/admin-info/change-info/${admin_token}`, {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(editAdminResult => {

        if (editAdminResult.isOk) {
            Toast.fire({
                icon: 'success',
                title: editAdminResult.responseText,
            })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: editAdminResult.responseText,
            })
        }
    })

}
function submitPasswordChangegAdmin(admin_token) {
    const adminInfoCurrentPassowrdInput = document.getElementById('admin-info-current-passowrd-input');
    const adminInfoNewPassowrdInput = document.getElementById('admin-info-new-passowrd-input');
    const adminInfoConfitmPassowrdInput = document.getElementById('admin-info-confitm-passowrd-input');


    if (
        adminInfoCurrentPassowrdInput.value.trim() != "" &&
        adminInfoNewPassowrdInput.value.trim() != "" &&
        adminInfoConfitmPassowrdInput.value.trim() != ""
        ){

        fetch(`${mainUrl}/admin-info/change-password/${admin_token}`, {
            method: 'POST',
            headers: {"Content-type" : 'application/json'},
            body: JSON.stringify({
                current_password: adminInfoCurrentPassowrdInput.value.trim(),
                new_password: adminInfoNewPassowrdInput.value.trim(),
                confirm_password: adminInfoConfitmPassowrdInput.value.trim()
            })
        })
        .then(res => res.json())
        .then(changeResult =>{

            if (changeResult.isOk) {
                Toast.fire({
                    icon: 'success',
                    title: changeResult.responseText,
                })
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: changeResult.responseText,
                })
            }
        })


    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا فیلد هارو به درستی پر کنید",
        })
    }

}

