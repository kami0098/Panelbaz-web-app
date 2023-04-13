const e = require("express");

function phoneNumberValidator(number) {

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

function sessionIdValidatro(sid){
    let sidPattern = /^(\w|\d|-|_){32}$/g;
    let isSid = false;
    if (sidPattern.test(sid)){
        isSid = true;
    }
    else {
        isSid = false;
    }
    return isSid;
}

function textInputVidator (text){

}


module.exports = {
    usernameValidator,
    phoneNumberValidator,
    passowrdValidator,
    emailValidator,
    firstNameValidator,
    lastNameValidator,
    sessionIdValidatro,
    textInputVidator
}




