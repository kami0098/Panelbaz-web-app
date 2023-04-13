// coockie
function getCookie(name) {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [k, v] = el.split('=');
    cookie[k.trim()] = v;
  })
  return cookie[name];
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function removeCookie(name){
  const d = new Date();
  d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
  console.log(`${name}=error; expires=${d.toUTCString()}; path=${location.pathname.slice(1)}`);
  document.cookie = `${name}=error; expires=${d.toUTCString()}; path=/`;
}

// replace number with ( , )

function betweenNumber (num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {getCookie, setCookie, removeCookie, betweenNumber};
