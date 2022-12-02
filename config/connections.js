const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        user: "root",
        password: "rootroot",
        database: "employee_tracker_db"
    });
}

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   // Your username
//   user: "root",
//   // Your password
//   password: "rootroot",
//   database: "employee_tracker_db"
// });

// connection.connect(function (err) {
//   if (err) throw err;
// });

// module.exports = connection;