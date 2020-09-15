const mysql = require("mysql");
const inquirer = require("inquirer");


let PORT = process.env.PORT || 8080;


let db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "marine75",
  database: "businessDB"
});

db.connect(function (err) {
  if (err) throw err;
  mainFunction();
});

mainFunction = () => {
  inquirer
    .prompt(
      {
        name: "newInput",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add New Department",
          "View Departments",
          "Add Role",
          "View Roles",
          "Update Role",
          "Add Employee",
          "View Employees",
          "Update Employee",
          "Exit"
        ]
      }).then(answers => {
        switch (answers.newInput) {
          case "Add New Department":
            addDepartment();
            break;
          case "View Departments":
            viewDepartment();
            break;
          case "Add Role":
            addRole();
            break;
          case "View Roles":
            viewRole();
            break;
          case "Update Role":
            updateRole();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "View Employees":
            viewEmployee();
            break;
          case "Update Employee":
            updateEmployee();
            break;
          case "Exit":
            db.end();
            break;
        }
      })
}

addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the new department?"
      }
    ])
    .then(function (answer) {
      db.query("INSERT INTO departments SET ?",
        {
          department: answer.department

        });
      viewDepartment();

    })
}


viewDepartment = () => {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res)
    mainFunction();
  })
}

addRole = () => {
  db.query("SELECT * FROM departments", function (err, res) {
    if(err) throw err;
    let departmentChoice = [];
    for (let i = 0; i < res.length; i++) {
      departmentChoice.push(res[i].department);
    }
    inquirer
      .prompt(
        [
          {
            name: "role",
            type: "input",
            message: "What is the name of the new role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
          },
          {
            name: "department_ID",
            type: "list",
            message: "What department does this role belong to?",
            choices: departmentChoice
          }
        ]
      )
      .then(function (answer) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].department === answer.department_ID) {
            db.query("INSERT INTO role SET ?",
              {
                title: answer.role,
                salary: answer.salary,
                department_id: res[i].id

              });
            break;
          }
        }
        viewRole();
      })
  })
}

viewRole = () => {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res)
    mainFunction();
  })
}

updateRole = () => {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    let roleChoice = [];
    for (let i = 0; i < res.length; i++) {
      roleChoice.push(res[i].title)
    }
    inquirer
      .prompt(
        [
          {
            name: "roleTitle",
            type: "list",
            message: "What Role would you like to update?",
            choices: roleChoice
          },
          {
            name: "roleOptions",
            type: "list",
            message: "What would you like to update?",
            choices: ["Title", "Salary", "Both"]
          }
        ]
      )
      .then(function(answer) {
        let chosenRole;
        for(let i = 0; i < res.length; i++) {
          if(res[i].title === answer.roleTitle) {
            chosenRole = res[i];
          }
        }
        switch (answer.roleOptions) {
          case "Title":
            inquirer
              .prompt(
                [
                  {
                    name: "newTitle",
                    type: "input",
                    message: "What is this roles new title?",
                  }
                ]
              )
              .then(function(answer) {
                db.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      title: answer.newTitle
                    },
                    {
                      id: chosenRole.id
                    }
                  ])
                  viewRole();
                  mainFunction();
              });
            break;
          case "Salary":
            inquirer
              .prompt(
                [
                  {
                    name: "newSalary",
                    type: "input",
                    message: "What is this roles new salary?"
                  }
                ]
              )
              .then(function(answer) {
                db.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      salary: answer.newSalary
                    },
                    {
                      id: chosenRole.id
                    }
                  ])
                  viewRole();
                  mainFunction();
              })
            break;

          case "Both":
            inquirer
              .prompt(
                [
                  {
                    name: "newTitle",
                    type: "input",
                    message: "What is this roles new title?",
                  },
                  {
                    name: "newSalary",
                    type: "input",
                    message: "What is this roles new salary?"
                  }
                ]
              )
              .then(function(answer) {
                db.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      title: answer.newTitle,
                      salary: answer.newSalary
                    },
                    {
                      id: chosenRole.id
                    }
                  ]
                )
                viewRole();
                mainFunction();
              })
            break;
          
        }
      })

  })

}

addEmployee = () => {
  db.query("SELECT * FROM role", function(err, res) {
      if(err) throw err;
      let roleChoice = [];
      for (let i = 0; i < res.length; i++) {
          roleChoice.push(res[i].title);
      }
  inquirer
    .prompt(
      [
      {
        name: "firstName",
        type: "input",
        message: "What is this employees first name?"
      },
      {
          name: "lastName",
          type: "input",
          message: "What is this employees last name?"
      },
      {
          name: "role",
          type: "list",
          message: "What is this employees role?",
          choices: roleChoice
      },
      {
        name: "manager",
        type: "list",
        message: "Who is this employees manager?",
        choices: managerChoice()
    }
    ]
    )
    .then(function (answer) {
      for (let i = 0; i < res.length; i++) {
          if (res[i].title === answer.role) {
              db.query("INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: res[i].id,
          manager_id: answer.SOMETHING
        });
        break;
          }
      }
      
      viewEmployee();

    })
})
}

managerChoice = () => {
  db.query("SELECT * FROM employee", function(err, res){
    if(err) throw err;
    let employeeList = [];
    for(let i = 0; i < res.length; i++){
      employeeList.push(res[i].first_name + res[i].last_name)
    }
  })
  return employeeList;
}


viewEmployee = () => {
  db.query("SELECT * FROM employee", function(err, res){
    if(err) throw err;
    console.table(res)
  })
}

updateEmployee = () => {

}

