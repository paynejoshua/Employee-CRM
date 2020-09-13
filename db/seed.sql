INSERT INTO department (name) values ("HR");
INSERT INTO department (name) values ("IT");
INSERT INTO department (name) values ("Finances");

INSERT INTO role (title, salary, department_id) values ("HR Manager", 50,000, 1);
INSERT INTO role (title, salary, department_id) values ("HR Rep", 30,000, 1);
INSERT INTO role (title, salary, department_id) values ("IT Manager", 50,000, 2);
INSERT INTO role (title, salary, department_id) values ("IT Technician", 40,000, 2);
INSERT INTO role (title, salary, department_id) values ("Finance Manager", 50,000, 3);
INSERT INTO role (title, salary, department_id) values ("Assistant Financial Manager", 30,000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Sheila", "Johnson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Mark", "Robinson", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Bill", "Tomlinson", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Sally", "Hanson", 6, 3);






