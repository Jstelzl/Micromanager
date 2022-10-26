const inquirer = require('inquirer');
const consoleTable = require('console.table');

var managers = [];
var roles = [];
var employees = [];

const getManager = () => {
    connection.query(`SELECT manager, manager_id FROM managers`, (err, res) => {
        if (err) throw err;
        managers = [];
        for (let i = 0; i < res.lenth; i++) {
            const manager = res[i].manager;
            const manager_id = res[i].manager;
            let newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        return managers;
    })
};

const getRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++) {
            const id = res[i].role_id;
            const title = res[i].title;
            var newRole = {
                name: title,
                value: id
            }
            roles.push(newRole)
        }
        return roles;
    })
};

const getEmployee = () => {
    connection.query(`SELECT first_name, last_name, id FROM employees`, (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++) {
            const id = res[i].id;
            const firstName = res[i].first_name;
            const lastName = res[i].last_name;
            var newEmployee = {
                name: firstName.concat(" ", lastName),
                value: id
            }
            employees.push(newEmployee);
        }
        return employees;
    })
};

const roleCheck = `SELECT id, employee.first_name, employee.last_name, title, salary, department.role, managers.manager
FROM employee
JOIN role ON employee.role_id = role.role_id
JOIN department ON role.department_id = department.department_id
LEFT JOIN managers ON employee.manager_id = managers.manger_id`;

const init = () => {
    getEmployee();
    getRole();
    getManager();

    inquirer
        .prompt({
            name: 'init',
            type: 'rawlist',
            message: 'What would you like to do?',
             choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Remove Emplyee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'View All Managers',
             ],
        })
        .then((answer) => {
            switch (answer.init) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Employees By Department':
                    viewAllEmployeesByDepartment();
                    break;
                case 'View All Employees by Manager':
                    viewAllEmployeesbyManager();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Remove Emplyee':
                    removeEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Managers':
                    viewAllManagers();
                    break;
            }
        })
};

const viewAllEmployees = () => {
    connection.query(roleCheck, (err, res) => {
        console.log("\nAll EMPLOYEES\n");
        if (err) throw err;
        console.table(res);
        init
    })
};

const viewAllEmployeesByDepartment = () => {
    inquirer
        .prompt({
            type: 'rawlist',
            name: 'departments',
            message: 'Choose a department.',
            choices: ['Engineering', 'Finance', 'Legal']
        })
        .then((answer) => {
            if (answer.departments === 'Engineering') {
                connection.query(`SELECT employee.first_name, employee.last_name FROM employee
                JOIN role ON employee.role_id = role.role_id
                JOIN department ON role.department_id = department.department_id and department.role = "Engineering"`, (err, res) => {
                    console.log('\nEngineers\n');
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            } 
            else if (answer.departments === 'Finance') {
                connection.query(`SELECT employee.first_name, employee.last_name FROM employee
                JOIN role ON employee.role_id = role.role_id
                JOIN department ON role.department_id = department.department_id and department.role = "Finance`, (err, res) => {
                    console.log("\nFInance\n");
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            }
            else if (answer.department === 'Legal') {
                connection.query(`SELECT employee.first_name, employee.last_name FROM employee
                JOIN role ON employee.role_id = role.role_id
                JOIN department ON role.department_id = department.department_id and department.role = "Legal"`, (err, res) => {
                    console.log("\nLegal\n");
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            }

        });
};

const viewAllEmployeesbyManager = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'manager',
            message: 'Choose a manager from the list.',
            choices: managers
        }).then((answer) => {
            connection.query(`SELECT frist_name, last_name FROM employee
            WHERE manager_id = ${answer.manager}:`, (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
            })
        })
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
            if (answer.manager === 'none'){
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

const removeEmployee = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to romve?',
            choices: employees
        }).then((answer) => {
            connection.query(`DELETE FROM employee WHERE id=${answer.employee}`, (err, res) => {
                if (err) throw err;
                init();
            })
            console.log(answer);
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

const updateEmployeeManager = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee is getting a new manager?',
                choices: employees
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is your new manager?',
                choices: managers
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee
            SET manager_id = ${answer.manager}
            WHERE id = ${answer.employee}`, (err, res) => {
                if (err) throw err;
                init()
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

const viewAllManagers = () => {
    connection.query(`SELECT manager FROM managers`, (err, res) => {
        if (err) throw err;
        console.log('\nALL MANAGERS\n');
        console.table(res);
        init();
    })
};


init();