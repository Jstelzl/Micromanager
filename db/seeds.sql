USE employee_tracker_db;

INSERT INTO department (name)
VALUES
("Sales"),
("Accounting"),
("Legal"),
("Finance");

INSERT INTO role
    (title, salary, department_id)
VALUES
 ("Lead Engineer", 230000, 2), 
 ("Softwar Engineer", 160000, 2), 
 ("Sales Lead", 100000, 1), ("Sales Person", 80000, 1), 
 ("Legal Team Lead", 350000, 4), 
 ("Lawer", 300000, 4), 
 ("Accountant", 135000, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Peterson", 1, NULL), 
("Jeff", "Williams", 2, 1), 
("Josh", "Hobbs", 3, NULL),
("Ashley", "Hawkins", 4, 2),
("David", "Mercel", 5, 1),
("Beth", "Lacy", 6, 3),
("Robert", "Shellin", 7, 2);

