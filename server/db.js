const mysql2 = require('mysql2')

const sql = mysql2.createConnection({
    database: 'chatdb',
    user: 'root',
    password: 'Ola__987',
    host: 'localhost'
}).promise()

module.exports = sql;