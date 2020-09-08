USE employee_trackerDB;

INSERT INTO dept (dept_name)
VALUES 
("socks"),
("shoes"),
("heels"),
("jeans");

INSERT INTO title (title, salary, dept_id)
VALUES 
("manager", 500, 1),
("cashier", 200, 1),
("manager", 500, 1);

INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES 
("bob", "builder", 10, NULL);