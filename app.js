const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");

let department = [];
let role = [];
let employee = [];

let PORT = process.env.PORT || 8080;


let connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "",
    database: "businessDB"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    mainFunction();
  });

  mainFunction = () => {
      inquirer 
        .prompt (
            {
            name: "newInput",
            type: "list",
            choices: [
                "Add New Department",
                "View Department",
                "Add Role",
                "View Role",
                "Update Role",
                "Add Employee",
                "View Employee",
                "Update Employee",
                "Exit"
            ]
  }).then(answers => {
    switch(answers.action) {
        case "Add New Department":
            return addDepartment();
            break;
        case "View Department":
            return viewDepartment();
            break;
        case "Add Role":
            return addRole();
            break;
        case "View Role":
            return viewRole();
            break;
        case "Update Role":
            return updateRole();
            break;
        case "Add Employee":
            return addEmployee();
            break;
        case "View Employee":
            return viewEmployee();
            break;
        case "Update Employee":
            return updateEmployee();
            break;
        case "Exit":
            db.end();
            break;
    }
  })
  }

  addDepartment = () => {

  }


  viewDepartment = () => {
      
  }

  addRole = () => {
      
}

  viewRole = () => {
      
}

  updateRole = () => {
      
}

  addEmployee = () => {
      
}

  viewEmployee = () => {
      
}

  updateEmployee = () => {
      
}

