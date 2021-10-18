//require()
const mysql = require("mysql2");
const inquirer = require("inquirer");
//const table = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',

    // issues getting certain ports working, sticking with 3306 as of now
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'jgasper10',
    database: 'employees_db'
});

module.exports = connection;