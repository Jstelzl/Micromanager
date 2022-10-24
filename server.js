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

};

const getEmployee = () => {

};

const init = () => {
    getEmployee();
    getRole();
    getManager();
};


init();