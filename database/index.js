const mysql = require('mysql');

const conn = mysql.createConnection({
    // host: 'localhost',
    // user: 'wakdoyok',
    // password: '12345',
    // database: 'popokpedia',
    // port: 3306
    host: 'db4free.net',
    user: 'budiyarto23',
    password: 'budi_1996',
    database: 'popokpediadeluxe',
    port: 3306
});

module.exports = conn;