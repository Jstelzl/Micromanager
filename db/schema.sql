-- DROP DATABASE IF EXISTS emplyee_tracker_db;
CREATE DATABASE emplyee_treacker_db;

USE emplyee_tracker_db;

CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT ,
    role VARCHAR(30),
    PRIMARY KEY (department_id)
);
