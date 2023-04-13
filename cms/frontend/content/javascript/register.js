let mainUrl = 'http://localhost:4000/api';

const form = document.getElementById('form')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const submitAdminLogin = document.getElementById('submit-admin-login')
const forgetOassword = document.getElementById('forget-password')


window.addEventListener('load', () => {
    let cookie = getCookie("panelbaz_admin")
    if (cookie) {
        
        fetch(`${mainUrl}/admin-register/auth/${getCookie("panelbaz_admin")}`)
        .then(res => res.json())
        .then(adminData => {
            if (adminData.isOk && adminData.data.length) {
                location.href = 'http://127.0.0.1:5500/cms/frontend/index.html';
            }
            else {
                removeCookie("panelbaz_admin");
            }

            console.log(adminData);
        })
        
    }
    
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    background: '#34343e',
    color: '#ddddde',

})

// cookie handler
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

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
    console.log(`${name}=error; expires=${d.toUTCString()}; path=${location.pathname.slice(1)}`);
    document.cookie = `${name}=error; expires=${d.toUTCString()}; path=/`;
}

// submit
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (usernameInput.value.trim() != "" && passwordInput.value.trim() != "") {
        fetch(`${mainUrl}/admin-register/login`, {
            method: "POST",
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify({
                username: usernameInput.value.trim(),
                password: passwordInput.value.trim(),
            })
        })
            .then(res => res.json())
            .then(registerResult => {
                if (registerResult.isOk) {
                    Toast.fire({
                        icon: 'success',
                        title: registerResult.responseText,
                    })

                    setCookie("panelbaz_admin", registerResult.data, 3)

                    setTimeout(() => {
                        location.reload();
                    }, 2000)
                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: registerResult.responseText,
                    })
                }
            })
    }

})




