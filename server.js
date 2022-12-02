const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./config/connections');

var managers = []
var roles = []
var employees = []

// List of prompts
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
        // Switch case
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

// View a table of all the employees: COMPLETED
const viewAllEmployees = () => {
    connection.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department,
     role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee 
     LEFT JOIN role ON employee.role_id = role.id
     LEFT JOIN department ON role.department_id = department.id
     LEFT JOIN employee manager ON manager.employee_id = employee.manager_id;`
        , (err, res) => {
            console.log("\nAll EMPLOYEES\n");
            if (err) throw err;
        })
        .then(([data]) => {
            console.table(data);
            init();
        })

};

// View a table of all departments: COMPLETED
function viewDepartments() {
    //query to view all departments
    connection.query(`SELECT department.name, department.id 
    FROM department;`
        , (err, res) => {
            console.log("\n Department in database \n");
            if (err) throw err
        })
        .then(([data]) => {
            console.table(data);
            init();
        })
};


// Add an employee to the employee table: INCOMPLETE
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
                name: 'last_name',
                message: 'What is your last name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is your role?',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is your manager?',
                choices: managers
            },
        ]).then((answer) => {

            connection.query(`INSERT INTO employee(first_name, last_name, role)
                    values ('${answer.first_name}', '${answer.last_name}', ${answer.role}, NULL)`, (err, res) => {
                if (err) throw err;
                init();
            })

            // else {
            //     connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
            //         values ('${answer.first_name}', ${answer.last_name}, ${answer.role}, ${answer.manager})`, (err, res) => {
            //         if (err) throw err;
            //         init();
            //     })
            // }
        })
};

// Update a role: INCOMPLETE
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
            connection.query(`UPDATE employee SET role_id = ${answer.role} 
                WHERE id = ${answer.employee};`, (err, res) => {
                if (err) throw err;
                init();
            })
        })
};

// View a table of all roles: COMPLETED
const viewAllRoles = () => {
    connection.query(`SELECT role.title, role.id, role.salary, department.name AS department 
    FROM role LEFT JOIN department ON role.department_id = department.id;`, (err, res) => {
        console.log('\nALL ROLES\n');
        if (err) throw err;
    })
        .then(([data]) => {
            console.table(data);
            init();
        })
};

// Add a department: INCOMPLETE
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is this department called?',
            }
        ])
    connection.query(`INSERT INTO department(name)
        VALUES ('${answer.name}');`
        , (err, res) => {
            console.log("\nADD_DEPARTMENT\n");
            if (err) throw err;
        })
        .then(([data]) => {
            console.table(data);
            init();
        })
};

// Add a role: INCOMPLETE
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is this role called?',
            }
        ])
        .then
};

// init caller
init();
