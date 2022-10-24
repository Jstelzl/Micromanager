INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jack", "Peterson", 1, null), 
("Jeff", "Williams", 2, 1), 
("Josh", "Hobbs", 3, null),
("Ashley", "Hawkins", 4, 2),
("David", "Mercel", 2, 1),
("Beth", "Lacy", 6, 3),
("Robert", "Shellin", 9, 2);

INSERT INTO managers(manager)
VALUES("Jack Peternson"), ("Ashley Hawkins"), ("Robert Shellin");

SELECT * FROM employee;
SELECT * FROM managers;