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
            addEmployees();
        }

        else if (runQuery == "Update Employee Role") {
            console.log("update employee role test");
            updateEmployeeRole();
        }

        else if (runQuery == "View All Roles") {
            console.log("View All Roles test");
            viewRoles();
        }

        else if (runQuery == "Add Role") {
            console.log("Add Role Test");
            addRole();
         }

         else if (runQuery == "View All Departments") {
             console.log("view all departments test");
             viewDepartments();
         }

         else if (runQuery == "Add Department") {
             console.log("add department test");
             addDepartment();
         }

         else {
             console.log("else exit");
             exit();
         }

    });
    
};
    // generates table of existing employees
function viewEmployees() {
    console.log("Generating Table\n");
  
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
  //adds employees to DB
  function addEmployees() {
    console.log("Inserting an employee!")
  
    var query =
      `SELECT r.id, r.title, r.salary 
        FROM role r`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("Please input the following Employee Info");
  
      inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(function (input) {
        console.log(input);
  
        var query = `INSERT INTO employee SET ?`
        // insert input from prompt into DB
        connection.query(query,
          {
            first_name: input.first_name,
            last_name: input.last_name,
            role_id: input.roleId,
            manager_id: input.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("New Employee added!\n");
  
            startApp();
          });
      });
  
    });
  }



  
 

  //updates existing employee roles
  function updateEmployeeRole() {
    console.log("Updating an employee");
  
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
  
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));
  
      console.table(res);
      console.log("employeeArray To Update!\n")
  
      console.log("Updating an role");

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          startApp();
        });
    });
})
  });
};

// generates table of existing employee roles
function viewRoles() {
    var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
    connection.query(query, function (err, res) {
        if (err) throw err;
    
        roleChoices = res.map(({ id, title, salary }) => ({
          value: id, title: `${title}`, salary: `${salary}`      
        }));
    
        console.table(res);
        startApp();
})};



//ADD role 

function addRole() {

    var query =
      `SELECT d.id, d.name, r.salary AS budget
      FROM employee e
      JOIN role r
      ON e.role_id = r.id
      JOIN department d
      ON d.id = r.department_id
      GROUP BY d.id, d.name`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      
      const departmentChoices = res.map(({ id, name }) => ({
        value: id, name: `${id} ${name}`
      }));
  
      console.table(res);
      console.log("Department array!");
  
      
      inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role title?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Role Salary"
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      var query = `INSERT INTO role SET ?`

      connection.query(query, {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.departmentId
      },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Role Inserted!");

          startApp();
        });

    });
})};

function viewDepartments() {
	var query = "SELECT * FROM department";
	connection.query(query, function (err, res) {
		if (err) throw err;
		console.log(`\nDEPARTMENTS\n`);
		
        console.table(res);
		startApp();
	});
}

function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Input name of new department."
      },
    ])
    
    .then(function (answer) {
		var query = "INSERT INTO department (name) VALUES ( ? )";
		connection.query(query, answer.department, function (err, res) {
			if (err) throw err;
			console.table(res);
		});
		
		startApp();
	});
}


function exit() {
    console.log("EXITING PROGRAM");
    connection.end();
}