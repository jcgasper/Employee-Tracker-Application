
USE employees_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Dover", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ken", "Dog", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Poppins", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Harry", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ronald", "McDonald", 1, 2);