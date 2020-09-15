DROP DATABASE IF EXISTS businessDB;

CREATE DATABaSE businessDB;

USE businessDB;

CREATE TABLE departments (

    id INT auto_increment,
    department VARCHAR(30),
    primary key (ID)
);

CREATE TABLE role (

    id INT auto_increment,
    title VARCHAR(30),
    salary INT DECIMAL,
    department_id INT,
    primary key (id) 

);

CREATE TABLE employee (

    id INT auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id INT,
    primary key (id)

)