USE employee_tracker_db;

INSERT INTO department (name)
VALUES
("Sales"),
("Accounting"),
("Legal"),
("Tech"),
("Finance");

INSERT INTO role
    (title, salary, department_id)
VALUES
 ("Lead Engineer", 230000, 4), 
 ("Softwar Engineer", 160000, 4), 
 ("Sales Lead", 100000, 1), 
 ("Sales Person", 80000, 1), 
 ("Legal Team Lead", 350000, 3), 
 ("Lawer", 300000, 3), 
 ("Accountant", 135000, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Peterson", 1, NULL), 
("Jeff", "Williams", 2, NULL), 
("Josh", "Hobbs", 3, NULL),
("Ashley", "Hawkins", 4, NULL),
("David", "Mercel", 5, NULL),
("Beth", "Lacy", 6, 1),
("Robert", "Shellin", 7, 2);

