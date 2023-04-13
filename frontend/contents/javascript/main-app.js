import { getCookie } from "./funcs.js";
import {setCookie} from "./funcs.js";
import { removeCookie } from "./funcs.js";
let mainUrl = 'http://localhost:3000/api';

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
  const navbarBtnWrapper = document.querySelector('.navbar-btn-wrapper');

  if (getCookie('panelbaz_token')) {

    fetch(`${mainUrl}/users/auth`, {
      method: 'GET',
      headers: { authorization: getCookie("panelbaz_token") }
    })
      .then(res => res.json())
      .then(data => {

        
        if (!data.isOk) {
          if (!data.isAvalable) {
            removeCookie("panelbaz_token");
          }
          Toast.fire({
            icon: 'error',
            title: data.responseText,
          })
          userNotLoggined(navbarBtnWrapper);
        }
        else {
          userLoggined(navbarBtnWrapper, `${data.responseText.firstname} ${data.responseText.lastname}`, data.responseText.inventory)
        }
      })
      .catch(er =>{console.log(er)})
  }
  else {
    userNotLoggined(navbarBtnWrapper);
  }
})

const loginWithPhoneBtn = document.querySelector('.login-with-phone-btn');
const loginWithEmailBtn = document.querySelector('.login-with-email-btn');
const loginFormModal = document.querySelector('.login-form-modal');

const recoveryWithPhoneBtn = document.querySelector('.recovery-with-phone-btn');
const recoveryWithEmailBtn = document.querySelector('.recovery-with-email-btn');
const recoveryFromModal = document.querySelector('.recovery-from-modal');

loginWithPhoneBtn.addEventListener('click', loginActionFunc);
loginWithEmailBtn.addEventListener('click', loginActionFunc);
let isLoginPhoneNumber = true;

function loginActionFunc(event) {
  if (event.target.tagName == "BUTTON") {

    document.querySelector('.login-modal-body .change-action-modal button.active').classList.remove('active');
    event.target.classList.add('active');
    if (isLoginPhoneNumber) {
      loginFormModal.innerHTML = `
            
            <input type="text" class="modal-form-input form-control my-3 shadow-none" id="login-email-input" placeholder="ایمیل یا نام کاربری" required>
            <p class="input-warning-caption">لطفا ایمیل یا نام کاربری را به درستی وارد کنید</p>
            <input type="password" class="modal-form-input form-control m-0 shadow-none" id="login-password-input" placeholder="رمز عبور" required>

            <p class="input-warning-caption">لطفا گذرواژه خود را به  درستی وارد کنید</p>

            <div class="moadl-form-other-action">
              
              <p class="register-new-account" data-bs-target="#register-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
                ساخت حساب جدید
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>
              <p class="recovery-password-account" data-bs-toggle="modal" href="#recovery-modal" role="button">
                بازیابی رمز عبور
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>

              </div>

              <button class="modal-form-submit-btn btn-style" type="button" id="login-btn">وارد شوید</button>
      `;

      // Login authenticate

      const loginEmailInput = document.getElementById('login-email-input');
      const loginPasswordInput = document.getElementById('login-password-input');
      const loginBtn = document.getElementById('login-btn');

      function loginSubmitBtn(){
        let loginEmailValue = loginEmailInput.value;
        let loginPassValue = loginPasswordInput.value;

        if (emailValidator(loginEmailValue.trim()) && passowrdValidator(loginPassValue.trim()) || usernameValidator(loginEmailValue.trim()) && passowrdValidator(loginPassValue.trim())) {
          let loginUserInfo = {
            username: loginEmailValue,
            password: loginPassValue,
          }

          fetch(`${mainUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(loginUserInfo)
          })
            .then(res => res.json())
            .then(data => {

              if (data.token && data.isOk) {
                Toast.fire({
                  icon: 'success',
                  title: data.responseText,
                })
                setCookie("panelbaz_token", data.token.trim());
                setTimeout(()=>{
                  location.reload();
                }, 1500)
              }
              else {
                Toast.fire({
                  icon: 'error',
                  title: data.responseText,
                })
              }
            })


        }
        else {

          Toast.fire({
            icon: 'error',
            title: "نام کاربری یا رمز عبور وارد شده معتبر نیست",
          })
        }

      }

      loginBtn.addEventListener('click', () => {

        loginSubmitBtn()

      })

      loginPasswordInput.addEventListener('keyup', (e)=>{
        if (e.code == "Enter"){
          loginSubmitBtn()
        }
      })
      loginEmailInput.addEventListener('keyup', (e)=>{
        if (e.code == "Enter"){
          loginSubmitBtn()
        }
      })


    }
    else {
      loginFormModal.innerHTML = `
            <input type="text" class="modal-form-input form-control my-3 shadow-none" id="login-phone-input" placeholder="شماره همراه" required>

            <div class="moadl-form-other-action">
              
              <p class="register-new-account" data-bs-target="#register-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
                ساخت حساب جدید
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>
              <p class="recovery-password-account" data-bs-toggle="modal" href="#recovery-modal" role="button">
                بازیابی رمز عبور
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>

              </div>

              <button class="modal-form-submit-btn btn-style" type="button" id="login-phone-btn">ادامه</button>
            
            `;
    }

    isLoginPhoneNumber = !isLoginPhoneNumber;

  }

}

recoveryWithPhoneBtn.addEventListener('click', recoveryActionFunc);
recoveryWithEmailBtn.addEventListener('click', recoveryActionFunc);
let isRecoveryPhoneNumber = true;

function recoveryActionFunc(event) {
  if (event.target.tagName == "BUTTON") {
    document.querySelector('.recovery-modal-body .change-action-modal button.active').classList.remove('active');
    event.target.classList.add('active');

    if (isRecoveryPhoneNumber) {
      recoveryFromModal.innerHTML = `
            
            <input type="text" class="modal-form-input form-control my-3 shadow-none" id="recovery-email-input" placeholder=" ایمیل یا نام کاربری" required>    
            <div class="moadl-form-other-action">
              
              <p class="register-new-account" data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
                رفتن به ورود
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>
    
            </div>
    
            <button class="modal-form-submit-btn btn-style" id="recovery-btn">ادامه</button>
            
            `;
    }
    else {
      recoveryFromModal.innerHTML = `
            
            <input type="text" class="modal-form-input form-control my-3 shadow-none" id="recovery-phone-input" placeholder="شماره همراه" required>
    
            <div class="moadl-form-other-action">
              
              <p class="register-new-account" data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
                رفتن به ورود
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </p>
    
            </div>
    
            <button class="modal-form-submit-btn btn-style" id="recovery-btn">ادامه</button>
            
            `;
    }

    isRecoveryPhoneNumber = !isRecoveryPhoneNumber;
  }
}

function phoneNumberValidator(number) {
  // 09016946555 11
  let isPhone = false;
  let phoneNumberPattern = /^(09)([0-9]{9})+$/g;
  if (!number.length < 11 || !number > 11 || !number == '' || !isNaN(number)) {
    if (phoneNumberPattern.test(number)) {
      isPhone = true;
    }
    else {
      isPhone = false;
    }
  }
  else {
    isPhone = false;
  }

  return isPhone;
}

function usernameValidator(username) {
  let usernamePattern = /^[a-z0-9A-Z\!\_\.\-]{3,18}$/g;
  let isUsername = false;

  if (username.length < 3 || username.length > 18 || username != "") {
    if (usernamePattern.test(username)) {
      isUsername = true;
    }
    else {
      isUsername = false;
    }
  }
  else {
    isUsername = false;
  }

  return isUsername;

}

function passowrdValidator(password) {
  let passwordPattern = /^(?=.*[0-9]?)(?=.*[!@#$%^&*]?)[a-zA-Z0-9!@#$%^&*]{8,20}$/g;
  let isPassword = false;

  if (!password.length < 8 || !password.length > 20 || password != "") {
    if (passwordPattern.test(password)) {
      isPassword = true;
    }
    else {
      isPassword = false;
    }
  }
  else {
    isPassword = false;
  }

  return isPassword;

}

function emailValidator(email) {
  let emailPattern = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  let isEmail = false;

  if (email != "" || !email.length < 5) {
    if (emailPattern.test(email)) {
      isEmail = true;
    }
    else {
      isEmail = false;
    }
  }
  else {
    isEmail = false;
  }

  return isEmail;

}

function firstNameValidator(names) {
  let isName = false;

  let firstnamePattern = /^[ا-ی\sa-zA-Z]{3,20}$/g;

  if (!names.length < 3 || !names.length > 20 || names != "") {
    if (firstnamePattern.test(names)) {
      isName = true;
    }
    else {
      isName = false;
    }
  }
  else {
    isName = false;
  }

  return isName;
}

function lastNameValidator(names) {
  let isName = false;

  let lastnamePattern = /^[ا-ی\sa-zA-Z]{3,30}$/g;

  if (!names.length < 3 || !names.length > 30 || names != "") {
    if (lastnamePattern.test(names)) {
      isName = true;
    }
    else {
      isName = false;
    }
  }
  else {
    isName = false;
  }

  return isName;
}


// login action template functions

function userLoggined(navElement, userNames, inventory) {
    navElement.innerHTML = `
    <a href="dashboard/index.html">
      <button class="btn-red50">ثبت سفارش</button>
    </a>
  <div class="navbar-user-info">
    <a href="#">
      <img src="contents/images/user-img.png" alt="user-logo">
    </a>

    <div class="navbar-dropdown-wrapper">
      <a href="#" class="nav-userinfo-wellcome-text">خوش امدید , ${userNames}</a>
      <div class="navbar-dropdown-content">
        <div class="navbar-dropdown-header">
          <img src="contents/images/user-img.png" alt="user-logo">
          <div>
            <p class="nav-drop-user-name">${userNames}</p>
            <div class="nav-drop-wallet-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-wallet" viewBox="0 0 16 16">
                <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>
              </svg>
              <p class="nav-drop-wallet-inventory">${inventory} تومان</p>
            </div>
          </div>
        </div>
        <div class="navbar-dropdown-body">
          <a href="#">پیشخوان</a>
          <a href="#">ثبت سفارش</a>
          <a href="#">افزودن اعتبار</a>
          <a href="#">سفارش ها</a>
          <a href="#">سرویس ها</a>
          <a href="#">تراکنش ها</a>
          <a href="#">پشتیبانی</a>
          <a href="#">تیکت ها</a>
          <a href="#">ویرایش پروفایل</a>
          <a href="#">خروج</a>
        </div>
      </div>
    </div>

  </div>
    
  `;
  // header dropdown
    const navUserinfoWellcomeText = document.querySelector('.nav-userinfo-wellcome-text');
    const navbarDropdownContent = document.querySelector('.navbar-dropdown-content');
    navUserinfoWellcomeText.addEventListener('mouseenter', () => navbarDropdownContent.classList.add('active'));
    navUserinfoWellcomeText.addEventListener('mouseleave', () => setTimeout(() => navbarDropdownContent.classList.remove('active'), 1500));
// ----------------------

}
function userNotLoggined(navElement) {
  navElement.innerHTML = `
  <button class="btn-gray50" data-bs-toggle="modal" href="#login-modal" role="button">ورود</button>
  <button class="btn-red50" data-bs-toggle="modal" href="#register-modal" role="button">ثبت نام</button>`;

}




// Register

let userInfo = {}

// phone number
const registerBtn = document.getElementById('register-btn');
const registerPhoneInput = document.getElementById('register-phone-input');

registerPhoneInput.addEventListener('keyup', () => {
  let inputValue = registerPhoneInput.value;

  if (phoneNumberValidator(inputValue)) {
    registerBtn.disabled = false;

    registerPhoneInput.nextElementSibling.style.display = 'none';
  } else {
    registerPhoneInput.nextElementSibling.style.display = 'block';
  }
})

registerBtn.addEventListener('click', () => {
  userInfo.phone = registerPhoneInput.value;
})

// sing up form

const signupFirstnameInput = document.getElementById('signup-firstname-input');
const signupLastnameInput = document.getElementById('signup-lastname-input');
const signupEmailInput = document.getElementById('signup-email-input');
const signupUsernameInput = document.getElementById('signup-username-input');
const signupPasswordInput = document.getElementById('signup-password-input');
const signupBtn = document.getElementById('signup-btn');

const signupModalInputs = document.querySelectorAll('.signup-form input');
signupModalInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.nextElementSibling.style.display = 'none';
  })
})




function submitCheckValidateData (){
  
  let userFirstname = signupFirstnameInput.value;
  let userLastname = signupLastnameInput.value;
  let userEmail = signupEmailInput.value;
  let username = signupUsernameInput.value;
  let userPass = signupPasswordInput.value;

  if (!firstNameValidator(userFirstname.trim()))
    signupFirstnameInput.nextElementSibling.style.display = 'block';

  if (!lastNameValidator(userLastname.trim()))
    signupLastnameInput.nextElementSibling.style.display = 'block';

  if (!emailValidator(userEmail.trim()))
    signupEmailInput.nextElementSibling.style.display = 'block';

  if (!usernameValidator(username.trim()))
    signupUsernameInput.nextElementSibling.style.display = 'block';

  if (!passowrdValidator(userPass.trim()))
    signupPasswordInput.nextElementSibling.style.display = 'block';


  if (
    firstNameValidator(userFirstname.trim()) &&
    lastNameValidator(userLastname.trim()) &&
    emailValidator(userEmail.trim()) &&
    usernameValidator(username.trim()) &&
    passowrdValidator(userPass.trim())) {

    userInfo.firstname = userFirstname;
    userInfo.lastname = userLastname;
    userInfo.email = userEmail;
    userInfo.username = username;
    userInfo.password = userPass;

    console.log(userInfo);

    fetch(`${mainUrl}/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userInfo)

    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.isOk && data.token) {

          setCookie("panelbaz_token", data.token, 3);

          Toast.fire({
            icon: 'success',
            title: data.responseText,
          })

          setTimeout(()=>{
            location.reload()
          }, 1500)

        }
        else if (!data.isOk) {
          Toast.fire({
            icon: 'error',
            title: data.responseText,
          })

        }
      })

  }
}

signupBtn.addEventListener('click', () => {
  submitCheckValidateData();
});





// alert













