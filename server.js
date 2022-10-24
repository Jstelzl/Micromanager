const mysql = require('mysel');
const inquirer = require('inquirer');
//const consoleTable = require('console.table');

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
            var newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        return managers;
    });
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
    });
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
                name: title,
                value: id
            }
            roles.push(newEmployee)
        }
        return roles;
    });
};

const init = () => {
    getEmployee();
    getRole();
    getManager();
};


init();