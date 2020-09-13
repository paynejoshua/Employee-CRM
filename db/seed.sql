INSERT INTO department (name) values ("HR");
INSERT INTO department (name) values ("IT");
INSERT INTO department (name) values ("Finances");

INSERT INTO role (title, salary, department_id) values ("HR Manager", 50000, 1);
INSERT INTO role (title, salary, department_id) values ("HR Rep", 30000, 1);
INSERT INTO role (title, salary, department_id) values ("IT Manager", 50000, 2);
INSERT INTO role (title, salary, department_id) values ("IT Technician", 40000, 2);
INSERT INTO role (title, salary, department_id) values ("Finance Manager", 50000, 3);
INSERT INTO role (title, salary, department_id) values ("Assistant Financial Manager", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Sheila", "Johnson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Mark", "Robinson", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Bill", "Tomlinson", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("Sally", "Hanson", 6, 3);