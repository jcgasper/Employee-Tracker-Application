//require()
const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = require("./app/connection")
//const table = require("console.table");
const introPrompt = require("./app/prompts");

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(`EMPLOYEE MANAGEMENT SYSTEM`)
    // runs the app
    
    startApp();
});

function startApp() {
    // runs inital startup questions then checks user response
    inquirer.prompt(introPrompt).then(function ({runQuery}) {

        
    
        if (runQuery == "View All Employees") {
            console.log("view all employees test");
            viewEmployees();
        }
        else if (runQuery == "Add Employee") {
            console.log("Add Employee Test");
        }

        else if (runQuery == "Update Employee Role") {
            console.log("update employee role test");
        }

        else if (runQuery == "View All Roles") {
            console.log("View All Roles test");
        }

        else if (runQuery == "Add Role") {
            console.log("Add Role Test");
         }

         else if (runQuery == "View All Departments") {
             console.log("view all departments test");
         }

         else if (runQuery == "Add Department") {
             console.log("add department test");
         }

         else {
             console.log("else exit");
         }

    });
    
};

function viewEmployees() {
    console.log("Viewing employees\n");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      startApp();
    });
  
  }