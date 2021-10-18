//require()
const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = require("./app/connection")
//const table = require("console.table");


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(`EMPLOYEE MANAGEMENT SYSTEM`)
    // runs the app
    
    //firstPrompt();
});

const introPrompt = [
	{
		type: 'rawlist',
		message: 'What Would You Like To Do?',
		name: 'queryInto',
		choices: [
			'View All Employees',
			'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'View All Employees By Department',
			'View All Employees By Manager',
			'Update Employee Manager',
			'Remove Employee',
			'Remove Role',
			'Remove Department',
			'View Total Utalized Budget Of A Department',
			'Exit',
		],
	},
];