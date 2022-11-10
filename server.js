// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
// Mock-Up

const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./config/connections');
//const { QueryInterface } = require('sequelize');

var managers = [];
var roles = [];
var employees = []

const init = () => {

    inquirer
        .prompt([
            {
                name: 'choice',
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'Add Employee',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'Update employee role',
                        value: 'UPDATE_EMPLOYEE_ROLE'
                    },
                    {
                        name: 'View all roles',
                        value: 'VIEW_ROLES'
                    },
                    {
                        name: 'Add role',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: 'View departments',
                        value: 'VIEW_DEPARTMENTS'
                    },
                    {
                        name: 'Add department',
                        value: 'ADD_DEPARTMENT'
                    },
                    {
                        name: 'Quit',
                        value: 'QUIT'
                    }
    
                ],
            }
        ])
        .then(res => {
            let choice = res.choice
            switch (choice) {
                case 'VIEW_EMPLOYEES':
                    console.log('hi');
                    viewAllEmployees();
                    break;
                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;
                case 'UPDATE_EMPLOYEE_ROLE':
                    updateEmployeeRole();
                    break;
                case 'VIEW_ROLES':
                    viewAllRoles();
                    break;
                case 'ADD_ROLE':
                    addRole();
                    break;
                case 'VIEW_DEPARTMENTS':
                    viewDepartments();
                    break;
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                default:
                    quit();
            }
        });
};

const viewAllEmployees = () => {
    connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department,
     role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id
     LEFT JOIN department ON role.department_id = department.id
     LEFT JOIN employee manager ON manager.id = employee.manager_id;`)
        //     , (err, res) => {
        //     console.log("\nAll EMPLOYEES\n");
        //     if (err) throw err;

        // })
        .then(([data]) => {
            console.table(data);
            init();
        })
        
};

function viewDepartments() {
    //query to view all departments
    const query = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err
        console.log("\n Department in database \n");
        console.table(res);
        init();
    });
  };



const addEmployee = () => {
    managers.push('none');
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is your first name?'
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'What is your last name?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'What if your role?',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is your manager?',
                choices: managers
            },
        ]).then((answer) => {
            if (answer.manager === 'none') {
                connection.query(`INSERT INTO employee(first_name, last_name, role_id)
                Values ('${answer.first_name}', '${answer.last_name}', ${answer.role}, null)`, (err, res) => {
                    if (err) throw err;
                    init();
                });
            }
            else {
                connection.query(`INSERT INTO employee(first_name, last_name, role_id)
                Values ('${answer.first_name}', ${answer.last_name}, ${answer.role}, ${answer.manager})`, (err, res) => {
                    if (err) throw err;
                    init();
                })
            }
        })
};

const updateEmployeeRole = () => {
    inquirer
        .prompt([

            {
                type: 'list',
                name: 'employee',
                message: "Who's role are we updating?",
                choices: employees
            },
            {
                type: 'list',
                name: 'role',
                message: 'What will be their new role?',
                choices: roles
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee
            SET role_id = ${answer.role}
            WHERE id = ${answer.employee};`, (err, res) => {
                if (err) throw err;
                init();
            })
        })
};

const viewAllRoles = () => {
    connection.query(`SELECT title FROM role`, (err, res) => {
        console.log('\nALL ROLES\n');
        if (err) throw err;
        console.table(res);
        init();
    })
};

const addDepartment = () => {

};


init();