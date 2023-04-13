const mysql = require('mysql');

let panelbaz_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'panelbaz'
})

module.exports = panelbaz_db;

