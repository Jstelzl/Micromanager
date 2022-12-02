DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- Table for departments
CREATE TABLE department (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Table for roles
CREATE TABLE role(
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    INDEX dep_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
    
-- Table for employees
CREATE TABLE employee (
    employee_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    INDEX role_index (role_id),
    manager_id INT UNSIGNED,
    INDEX manager_index (manager_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);