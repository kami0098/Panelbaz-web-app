let mainUrl = 'http://localhost:3000/api';

let showContentModal = document.getElementById('show-content-modal');

// funcs

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}


function removeCookie(name) {
    const d = new Date();
    d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=error; expires=${d.toUTCString()}; path=${location.pathname.slice(1)}`;
}

function betweenNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

const EditOrderDialog = Swal.mixin({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
})





// dashboard-counter

function showDashboardCounterTiket(tiket) {
    console.log(tiket);
}
// transaction

function userTransAction(userToken) {

    let inventoryIncreaseInput = document.getElementById('inventory-increase-input');
    let pattern = /^[1-9][0-9]{3,7}$/g;
    if (inventoryIncreaseInput.value && !isNaN(inventoryIncreaseInput.value) && pattern.test(inventoryIncreaseInput.value)) {

        let newTransActionInfo = {
            price: inventoryIncreaseInput.value
        }

        fetch(`${mainUrl}/transaction/${userToken}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTransActionInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.isOk && data.paymentResult.length) {

                    Toast.fire({
                        icon: 'success',
                        title: data.responseText
                    })
                    console.log(data.paymentResult);
                }
                else if (!data.isOk) {
                    if (data?.isAuthErr) {
                        removeCookie("panelbaz_token");
                    }

                    Toast.fire({
                        icon: 'error',
                        title: data.responseText
                    })
                }
            })
    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا مبلغ صحیح وارد کنید",
        })
    }
}

// all services
function showAllServiceDetails(serviceDetails) {
    showContentModal.innerHTML = serviceDetails;
}

// tikets
function dashboardSendTiket(userToken) {

    const tiketTitleInput = document.getElementById('dashboard-title-tiket-input');
    const tiketOrderIDInput = document.getElementById('dashboard-order_id-tiket-input');
    const tiketContentInput = document.getElementById('dashboard-content-tiket-input');
    const fileInput = document.getElementById('upload-file-btn')

    const text1_Validator = /^[^'^<>"&~`]+$/g;
    const text2_Validator = /^[^'^<>"&~`]+$/g;
    const numberValidator = /^\d{1,20}$/g;


    if (

        tiketContentInput.value.trim() &&
        text1_Validator.test(tiketContentInput.value.trim()) &&
        tiketTitleInput.value.trim() &&
        text2_Validator.test(tiketTitleInput.value.trim()) &&
        tiketOrderIDInput.value.trim() &&
        numberValidator.test(tiketOrderIDInput.value.trim()) &&
        !isNaN(tiketOrderIDInput.value.trim())

    ) {

        let ticketInfo = {

            title: tiketTitleInput.value,
            orderID: tiketOrderIDInput.value,
            content: tiketContentInput.value,
            isActive: 1,
        }        
        const formData = new FormData();

        formData.append("files", fileInput.files[0])
        formData.append("content", JSON.stringify(ticketInfo))

        fetch(`${mainUrl}/tikets/${userToken}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(tiketResponse => {
                if (tiketResponse.isOk) {

                    Toast.fire({
                        icon: 'success',
                        title: tiketResponse.responseText
                    })
                    tiketTitleInput.value = "";
                    tiketOrderIDInput.value = "";
                    tiketContentInput.value = "";
                }
                else {

                    Toast.fire({
                        icon: 'error',
                        title: tiketResponse.responseText
                    })
                }

            })

    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا فیلد هارو به درستی وارد کنید"
        })
    }




}

function dashboardShowTiketsContent(tiketContent) {
    showContentModal.innerHTML = tiketContent;
}

function showDashboardTiketAnswer(answer) {
    if (answer == "null") {
        showContentModal.innerHTML = "هنوز جوابی برای این تیکت ثبت نشده !!";
    } else {
        showContentModal.innerHTML = answer;
    }
}


// update user
function dashboadUpdateBasicUserInfo(userToken) {


    const dashboardFirstnameInput = document.getElementById('dashboard-firstname-input').value.trim();
    const dashboardLastnameInput = document.getElementById('dashboard-lastname-input').value.trim();
    const dashboardEmailInput = document.getElementById('dashboard-email-input').value.trim();
    const dashboardUsernameInput = document.getElementById('dashboard-username-input').value.trim();

    let firstnamePattern = /^[ا-ی\sa-zA-Z]{3,20}$/g;
    let lastnamePattern = /^[ا-ی\sa-zA-Z]{3,30}$/g;
    let emailPattern = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/g;
    let usernamePatetrn = /^[a-z0-9A-Z\!\_\.\-]{3,18}$/g;

    if (firstnamePattern.test(dashboardFirstnameInput) &&
        lastnamePattern.test(dashboardLastnameInput) &&
        emailPattern.test(dashboardEmailInput) &&
        usernamePatetrn.test(dashboardUsernameInput)) {
        let newUserInfo = {
            isBasicInfoUpdate: true,
            firstname: dashboardFirstnameInput,
            lastname: dashboardLastnameInput,
            email: dashboardEmailInput,
            username: dashboardUsernameInput,
        }

        fetch(`${mainUrl}/users/update-user/${userToken}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newUserInfo)
        })
            .then(res => res.json())
            .then(updateResponse => {
                console.log(updateResponse);
                if (!updateResponse.isOk) {
                    if (updateResponse?.isAuthErr) {
                        removeCookie("panelbaz_token")
                    }

                    Toast.fire({
                        icon: 'error',
                        title: updateResponse.responseText
                    })

                }
                else {
                    Toast.fire({
                        icon: 'success',
                        title: updateResponse.responseText
                    })
                }
            })


    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا فیلد ها رو به درستی وارد کنید"
        })
    }



}

function dashboardUpdateUserInfo(userToken) {
    const dashboardFirstPassInput = document.getElementById('dashboard-first-pass-input').value.trim();
    const dashboardLastPassInput = document.getElementById('dashboard-last-pass-input').value.trim();
    const dashboardPhoneInput = document.getElementById('dashboard-phone-input').value.trim();
    let phoneNumberPattern = /^(09)([0-9]{9})+$/g;

    if (phoneNumberPattern.test(dashboardPhoneInput)) {
        let newUserInfo = {
            isBasicInfoUpdate: false,
            phone: dashboardPhoneInput,
            password: false,
        }

        if (dashboardFirstPassInput && dashboardLastPassInput && dashboardFirstPassInput == dashboardLastPassInput) {
            let passwordPattern = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g;

            if (passwordPattern.test(dashboardFirstPassInput)) {

                newUserInfo.password = dashboardFirstPassInput;
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: "لطفا نام کاربری معتبری را وارد کنید"
                })
            }
        }

        fetch(`${mainUrl}/users/update-user/${userToken}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newUserInfo)
        })
            .then(res => res.json())
            .then(updateResponse => {
                console.log(updateResponse);
                if (!updateResponse.isOk) {
                    if (updateResponse?.isAuthErr) {
                        removeCookie("panelbaz_token")
                    }

                    Toast.fire({
                        icon: 'error',
                        title: updateResponse.responseText
                    })

                }
                else {
                    Toast.fire({
                        icon: 'success',
                        title: updateResponse.responseText
                    })
                }
            })
    }
    else {
        Toast.fire({
            icon: 'error',
            title: "لطفا شماره مبایل معتبری را وارد کنید"
        })
    }


}

// record order & select service 

function recordOrderResetInputs() {
    document.getElementById('record-order-number-input').value = "";
    document.getElementById('record-order-link-input').value = "";
    document.querySelector('.record-order-details-table-wrapper').classList.remove('active');
    document.querySelector('.record-order-dont-inventory').classList.remove('active');
    document.getElementById('record-order-number-count-label').innerHTML = "تعداد";
    document.getElementById('record-order-service-complete-time').value = "زمان تقریبی";
    document.querySelector('.record-order-detail-box').innerHTML = `
        <h3>توضیحات سرویس</h3>
        <p>توضیحات مربوط به هر سرویس در این قسمت قرار خواهد گرفت</p>
    `;
}

let orderService = null;
let orderProductId = null;
function recordOrderSelectProduct() {

    const recordOrderSelectProduct = document.getElementById('record-order-select-product');
    let productId = recordOrderSelectProduct.options[recordOrderSelectProduct.selectedIndex].value;
    orderProductId = productId;

    const recordOrderSelectServices = document.getElementById('record-order-select-services');

    fetch(`${mainUrl}/services/select-product-services/${productId}`)
        .then(res => res.json())
        .then(services => {
            recordOrderResetInputs();

            recordOrderSelectServices.innerHTML = '<option selected>لطفا سرویس خورد نظر خود را انتخاب کنید</option>';
            
            services.servicesData.forEach(service => {
                if (service.status){
                    
                    recordOrderSelectServices.innerHTML += `<option value="${service.id}">${service.title}</option>`;
                }
            });

        })

}

function recordOrderSelectServices() {
    const recordOrderSelectServices = document.getElementById('record-order-select-services');
    let serviceId = recordOrderSelectServices.options[recordOrderSelectServices.selectedIndex].value;
    let serviceIdPattern = /^[1-9]\d{0,6}$/g;
    if (serviceIdPattern.test(serviceId)) {
        fetch(`${mainUrl}/services/select-service/${serviceId}`)
            .then(res => res.json())
            .then(service => {

                fetch(`${mainUrl}/users/auth`, {
                    method: "GET",
                    headers: { authorization: getCookie("panelbaz_token").trim() }
                })
                    .then(userRes => userRes.json())
                    .then(userData => {

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

                            recordOrderResetInputs();

                            const recordOrderDetailBox = document.querySelector('.record-order-detail-box');

                            recordOrderDetailBox.innerHTML = `
                                <h3>${service.serviceData[0].title}</h3>
                                <p>${service.serviceData[0].description}</p>
                                <p>
                                    حداقل تعداد : ${service.serviceData[0].min}
                                    <br>
                                    حداکثر تعداد : ${service.serviceData[0].max}

                                </p>
                                <p>${service.serviceData[0].order_complete_date}</p>

                            `;


                            orderService = [userData.responseText.inventory, service.serviceData[0]];
                            document.querySelector('.record-order-form').classList.add('active');
                            document.getElementById('record-order-service-complete-time').value = service.serviceData[0].order_complete_date;
                            let orderCountLabel = Math.floor((orderService[0] / service.serviceData[0].price) * 1000);
                            document.getElementById('record-order-number-count-label').innerHTML = `
                                تعداد : 
                                <br>
                                <span class="order-count-label-show-inventory">با موجودی فعلی شما میتوانید ${betweenNumber(orderCountLabel)} تعداد سفارش دهید</span>
                            `;
                        }
                    })





            })
    }
    else {
        Toast.fire({
            icon: 'error',
            title: "شناسه سفارش نا معتبر است",
        })
    }


}

function recordOrderOnkeyup() {

    const recordOrderDetailsTable = document.querySelector('.record-order-details-table-wrapper');
    const recordOrderDontInventory = document.querySelector('.record-order-dont-inventory');

    let recordOrderNumberInput = document.getElementById('record-order-number-input').value.trim();
    let orderNumberPattern = /^[1-9]\d{2,6}$/g;

    if (recordOrderNumberInput != "" && !isNaN(recordOrderNumberInput) && orderNumberPattern.test(recordOrderNumberInput)) {

        let serviceCountPrice = orderService[1].price * recordOrderNumberInput / 1000;

        if (orderService[1].max >= recordOrderNumberInput && orderService[1].min <= recordOrderNumberInput) {

            if (orderService[0] >= serviceCountPrice) {
                recordOrderDontInventory.classList.remove('active');
                recordOrderDetailsTable.classList.add('active');

                document.getElementById('record-order-service-name').innerHTML = orderService[1].title;
                document.getElementById('record-order-service-price').innerHTML = betweenNumber(orderService[1].price);
                document.getElementById('record-order-service-price-leftover').innerHTML = betweenNumber(orderService[0] - serviceCountPrice) + " تومان ";
                document.getElementById('record-order-service-price-wallet').innerHTML = betweenNumber(serviceCountPrice) + " تومان ";
                document.getElementById('record-order-service-letters-price').innerHTML = Num2persian(serviceCountPrice);

            }
            else {
                recordOrderDetailsTable.classList.remove('active');
                recordOrderDontInventory.classList.add('active');
                recordOrderDontInventory.innerHTML = 'موجودی شما برای تعداد وارد شده کافی نیست';
            }

        }
        else {
            recordOrderDetailsTable.classList.remove('active');
            recordOrderDontInventory.innerHTML = `حداقل تعداد این محصول ${orderService[1].min} و حداکثر ${orderService[1].max}`;
            recordOrderDontInventory.classList.add('active');
        }

    }
    else {
        recordOrderDetailsTable.classList.remove('active');
    }



}

function recordOrderSubmit() {
    const recordOrderNumberInput = document.getElementById('record-order-number-input').value.trim();
    const recordOrderLinkInput = document.getElementById('record-order-link-input').value.trim();
    const recordOrderRoleInput = document.getElementById('record-order-role-input');


    let orderNumberPattern = /^[1-9]\d{2,6}$/g;
    var urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    if (recordOrderNumberInput && orderNumberPattern.test(recordOrderNumberInput)) {
        if (recordOrderLinkInput && urlPattern.test(recordOrderLinkInput) && recordOrderLinkInput.length > 6) {

            let serviceCountPrice = orderService[1].price * recordOrderNumberInput / 1000;

            if (orderService[1].max >= recordOrderNumberInput && orderService[1].min <= recordOrderNumberInput) {

                if (orderService[0] >= serviceCountPrice) {
                    if (recordOrderRoleInput.checked) {

                        let newRecordOrder = {
                            link: recordOrderLinkInput,
                            orderCount: recordOrderNumberInput,
                            serviceID: orderService[1].id,
                            productID: Number(orderProductId),
                        }

                        console.log(newRecordOrder);

                        fetch(`${mainUrl}/orders/record-order/${getCookie("panelbaz_token")}`, {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(newRecordOrder)
                        })
                            .then(res => res.json())
                            .then(orderResponse => {
                                Toast.fire({
                                    icon: 'success',
                                    title: "سفارش شما با موفقیت ثبت شد \n (دیدن جزییات به بخش سفارش ها بروید)",
                                })
                                recordOrderResetInputs()
                            })


                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: "لطفا قوانین رو تایید کنید",
                        })
                    }
                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: "موجودی شما برای ثبت این تعداد کافی نیست \n لطفا موجودی خود را افزایش دهید",
                    })
                }
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: "مقدار وارد شده بیشتر یا کمتر از حد مجاز است",
                })
            }

        }
        else {
            Toast.fire({
                icon: 'error',
                title: "لینک وارد شده نامعتبر است",
            })
        }
    }
    else {
        Toast.fire({
            icon: 'error',
            title: "تعداد وارد شده نامعتبر است",
        })
    }
}


// cancel and edit order service

function orderServiceAction(orderID, modalText) {
    return new Promise((resolve) => {

        fetch(`${mainUrl}/user-orders-status/get-order/${getCookie('panelbaz_token')}/${orderID}`)
            .then(res => res.json())
            .then(orderData => {
                if (orderData.userOrdersStatus[0].pending == 1) {
                    resolve()
                }
                else {
                    Dialog.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: modalText,
                    })
                }
            })
    })
}

function cancelOrderService(orderId) {
    orderServiceAction(orderId, "شما نمیتونید این سفارش رو لغو کنید")
        .then(() => {
            QDialog.fire({
                title: "توجه",
                text: "ایا از لغو این سفارش اطمینان دارید ؟ ",
            })
                .then(res => {
                    if (res.isConfirmed) {

                        fetch(`${mainUrl}/orders/cancel-order/${orderId}/${getCookie("panelbaz_token")}`)
                            .then(res => res.json())
                            .then(cancelRes => {
                                if (cancelRes.isOk) {
                                    Dialog.fire({
                                        icon: 'success',
                                        text: cancelRes.responseText
                                    })
                                        .then(res => {
                                            if (res.isConfirmed) {
                                                location.reload();
                                            }
                                        })
                                }
                                else {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'خطا',
                                        text: cancelRes.responseText,
                                    })
                                }


                            })
                    }
                })
        })
}

function editOrderService(orderId) {
    fetch(`${mainUrl}/orders/${orderId}/${getCookie("panelbaz_token")}`)
        .then(res => res.json())
        .then(orderData => {

            let orderNumberPattern = /^[1-9]\d{2,6}$/g;
            let urlPattern = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

            orderServiceAction(orderId, "شما نمیتونید این سفارش رو تغییر دهید")
                .then(async () => {



                    const { value: editOrderData } = await QDialog.fire({
                        title: 'تغییر تعداد یا لینک سفارش',
                        html:
                            `
                        <p>چنانچه قصد تغییر لینک یا تعداد سفارش رو دارید فیلد های پایین رو تغییر بدید</p> 
                        <input id="edit-order-link-input" class="swal2-input" placeholder="لینک سفارش" value="${orderData.ordersData[0].link}"> 
                        <input id="edit-order-count-input" class="swal2-input" placeholder="تعداد مورد نظر" value="${orderData.ordersData[0].count}">
                    `
                        ,
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById('edit-order-link-input').value,
                                document.getElementById('edit-order-count-input').value
                            ]
                        },

                    })

                    if (editOrderData) {



                        if (editOrderData[0].trim() && editOrderData[1].trim()) {

                            if (urlPattern.test(editOrderData[0])) {
                                if (orderNumberPattern.test(editOrderData[1])) {
                                    let oldServicePrice = orderData.ordersData[0].price / orderData.ordersData[0].count * 1000;
                                    let newOrderPrice = oldServicePrice * editOrderData[1] / 1000;

                                    console.log(newOrderPrice);

                                    fetch(`${mainUrl}/users/auth`, {
                                        method: "GET",
                                        headers: { authorization: getCookie("panelbaz_token").trim() }
                                    })
                                        .then(userRes => userRes.json())
                                        .then(userData => {

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


                                                let newEditedOrder = {
                                                    link: editOrderData[0],
                                                    count: editOrderData[1],
                                                    price: newOrderPrice,
                                                    isEqual: false
                                                }



                                                if (userData.responseText.max < editOrderData[1] || userData.responseText.min > editOrderData[1]) {
                                                    Dialog.fire({
                                                        icon: 'error',
                                                        title: 'خطا',
                                                        text: `تعداد وارد شده بیشتر یا کمتر از حد مجاز است \n حداقل : ${userData.responseText.min} \n حداکثر : ${userData.responseText.max}`
                                                    })
                                                }
                                                else {

                                                    if (newOrderPrice > orderData.ordersData[0].price) {
                                                        newEditedOrder.isDecreaseInventory = newOrderPrice - orderData.ordersData[0].price;
                                                    }
                                                    else if (newOrderPrice < orderData.ordersData[0].price) {
                                                        newEditedOrder.isIncreaseInventory = orderData.ordersData[0].price - newOrderPrice;
                                                    }
                                                    else {
                                                        newEditedOrder.isEqual = true
                                                    }


                                                    if (newEditedOrder?.isDecreaseInventory <= userData.responseText.inventory || newEditedOrder.isEqual || newEditedOrder?.isIncreaseInventory) {


                                                        fetch(`${mainUrl}/orders/edit-order/${orderId}/${getCookie("panelbaz_token")}`, {
                                                            method: "POST",
                                                            headers: { "Content-type": "application/json" },
                                                            body: JSON.stringify(newEditedOrder)
                                                        })
                                                            .then(editRes => editRes.json())
                                                            .then(editOrderRes => {
                                                                if (editOrderRes.isOk) {
                                                                    Dialog.fire({
                                                                        icon: 'success',
                                                                        text: editOrderRes.responseText
                                                                    })
                                                                        .then(res => {
                                                                            if (res.isConfirmed) {
                                                                                location.reload();
                                                                            }
                                                                        })
                                                                }
                                                                else {

                                                                    Toast.fire({
                                                                        icon: 'error',
                                                                        title: editOrderRes.responseText,
                                                                    })
                                                                }
                                                            })
                                                    }
                                                    else {
                                                        let maxOrderCount = Math.floor(userData.responseText.inventory / oldServicePrice * 1000);
                                                        Dialog.fire({
                                                            icon: 'error',
                                                            title: 'خطا',
                                                            text: `موجودی شما برای این تعداد از سفارش کافی نیست \n با موجودی فعلی ${maxOrderCount} تعداد میتونید سفارش دهید`
                                                        })
                                                    }
                                                }

                                            }
                                        })


                                }
                                else {
                                    Dialog.fire({
                                        icon: 'error',
                                        title: 'خطا',
                                        text: 'تعداد وراد شده صحیح نیست'
                                    })
                                }
                            }
                            else {
                                Dialog.fire({
                                    icon: 'error',
                                    title: 'خطا',
                                    text: 'لینک وارد شده نا معتبره'
                                })

                            }
                        }
                        else {
                            Dialog.fire({
                                icon: 'error',
                                title: 'خطا',
                                text: 'فیلد ها رو به درستی پر کنید'
                            })
                        }
                    }

                })


        })




}


