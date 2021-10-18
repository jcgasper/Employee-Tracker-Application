
const inquirer = require("inquirer");

const introPrompt = [
	{
		type: 'list',
		message: 'What Would You Like To Do?',
		name: 'runQuery',
		choices: [
			'View All Employees',
			'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit',
            /*'View All Employees By Department',
			'View All Employees By Manager',
			'Update Employee Manager',
			'Remove Employee',
			'Remove Role',
			'Remove Department',
			'View Total Utalized Budget Of A Department',
			,*/
		],
	},
];

module.exports = introPrompt;