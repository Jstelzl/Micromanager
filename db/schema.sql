-- DROP DATABASE IF EXISTS emplyee_tracker_db;
CREATE DATABASE emplyee_treacker_db;

USE emplyee_tracker_db;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT ,
    role VARCHAR(30),
    PRIMARY KEY (department_id)
);

INSERT INTO department(role)
VALUE("Sales"), ("Englineering"), ("Finance"), ("Legal");

CREATE TABLE role(
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (role_id)
);

INSERT INTO role(title, salary, department_id)
VALUES ("Lead Engineer", 230000, 2), ("Softwar Engineer", 160000, 2), ("Sales Lead", 100000, 1), ("Sales Person", 80000, 1) ("Legal Team Lead", 350000, 4), ("Lawer", 300000, 4), ("Accountant", 135000, 3);
    
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE managers (
    manager_id INT AUTO_INCREMENT,
    manager VARCHAR(30),
    PRIMARY KEY (manager_id)
);
