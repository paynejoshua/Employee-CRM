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
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "Add Employee",
          "Update Employee",
          "View Departments",
          "Add New Department",
          "View Roles",
          "Add Role",
          "Update Role",
          // "Remove Employee",
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
          // case "Remove Employee":
          //   removeEmployee();
          //   break;
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
    if (err) throw err;
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
            type: "rawlist",
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
            type: "rawlist",
            message: "What Role would you like to update?",
            choices: roleChoice
          },
          {
            name: "roleOptions",
            type: "rawlist",
            message: "What would you like to update?",
            choices: ["Title", "Salary", "Both"]
          }
        ]
      )
      .then(function (answer) {
        let chosenRole;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answer.roleTitle) {
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
              .then(function (answer) {
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
              .then(function (answer) {
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
              .then(function (answer) {
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
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    let roleChoice = [];
    for (let i = 0; i < res.length; i++) {
      roleChoice.push(res[i].title);
    }
    db.query("SELECT * FROM employee", function (err, employees) {

      if (err) throw err;
      let managers = []
      let i = 0;
      let resultsCount = employees.length;
      for (i; i < resultsCount; i++) {
        managers.push(employees[i].first_name + " " + employees[i].last_name)

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
              type: "rawlist",
              message: "What is this employees role?",
              choices: roleChoice
            },
            {
              name: "manager",
              type: "rawlist",
              message: "Who is this employees manager?",
              choices: managers

            }
          ]
        )
        .then(function (answer) {
          let roleId;
          let managerId;
          // Match the role
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === answer.role) {
              roleId = res[i].id;
              break;
            }
          }
          // Match the manager
          for (let i = 0; i < employees.length; i++) {
            let managerName = employees[i].first_name + " " + employees[i].last_name;
            if (managerName === answer.manager) {
              managerId = employees[i].id;
              break;
            }
          }
          db.query("INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: roleId,
              manager_id: managerId

            },
            function (err) {
              if (err) throw err;
              viewEmployee();
            });
        });
    })
  })
}


viewEmployee = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res)
    mainFunction();
  })
}

updateEmployee = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    let employees = []
    for (let i = 0; i < res.length; i++) {
      employees.push(res[i].first_name + " " + res[i].last_name)
    }
    inquirer
      .prompt([
        {
          name: "person",
          type: "rawlist",
          message: "Which employee would you like to update?",
          choices: employees

        },
        {
          name: "information",
          type: "rawlist",
          message: "What would you like to update?",
          choices: ["Full Name", "First Name", "Last Name", "Role", "Manager", "Exit"]
        },
      ])

      .then(function (answer) {
        let employeeID
        for (let i = 0; i < employees.length; i++) {
          if (employees[i] === answer.person) {
            employeeID = res[i].id;
            console.log(answer.information)
            switch (answer.information) {
              case "Full Name":
                inquirer
                  .prompt([
                    {
                      name: "fullName",
                      type: "input",
                      message: "What is this employees new full name?"
                    }
                  ])
                  .then(function (answer) {
                    const words = answer.fullName.split(' ');
                    db.query("UPDATE employee SET ? WHERE ?",
                      [
                        {
                          first_name: words[0],
                          last_name: words[1]
                        },
                        {
                          id: employeeID
                        }
                      ],
                      function (err) {
                        if (err) throw err;
                      })
                    viewEmployee();
                  })
                break;
              default:
                break;
              case "First Name":
                inquirer
                  .prompt([
                    {
                      name: "firstName",
                      type: "input",
                      message: "What is this employees new first name?"
                    }
                  ])
                  .then(function (answer) {
                    db.query("UPDATE employee SET ? WHERE ?",
                      [
                        {
                          first_name: answer.firstName
                        },
                        {
                          id: employeeID
                        }

                      ],
                      function (err) {
                        if (err) throw err;
                      })
                    viewEmployee();
                  })
                break;
              case "Last Name":
                inquirer
                  .prompt([
                    {
                      name: "lastName",
                      type: "input",
                      message: "What is this employees new last name?"
                    }
                  ])
                  .then(function (answer) {
                    db.query("UPDATE employee SET ? WHERE ?",
                      [
                        {
                          last_name: answer.lastName
                        },
                        {
                          id: employeeID
                        }

                      ],
                      function (err) {
                        if (err) throw err;
                      })
                    viewEmployee();
                  })
                break;
              case "Role":
                db.query("SELECT * FROM role", function (err, role) {
                  if (err) throw err;
                  let roleChoice = []
                  for (let i = 0; i < role.length; i++) {
                    roleChoice.push(role[i].title)
                  }
                  inquirer
                    .prompt(
                      [
                        {
                          name: "newRole",
                          type: "rawlist",
                          message: "What is this employees new role?",
                          choices: roleChoice
                        }
                      ]
                    )
                    .then(function (answer) {
                      let roleID;
                      for (let i = 0; i < role.length; i++) {
                        if (role[i].title === answer.newRole) {
                          roleID = role[i].id
                          console.log(roleID)
                          db.query("UPDATE employee SET ? WHERE ?",
                            [
                              {
                                role_id: roleID
                              },
                              {
                                id: employeeID
                              }
                            ],
                            function (err) {
                              if (err) throw err;
                            })
                          viewEmployee();
                        }
                      }
                    })
                })
                break;
              case "Manager":
                inquirer
                  .prompt(
                    [
                      {
                        name: "newManager",
                        type: "rawlist",
                        message: "Who is this employees new manager?",
                        choices: employees
                      }
                    ]
                  )
                  .then(function (answer) {
                    let managerID;
                    if (employees.includes(answer.newManager)){
                      let splitName = answer.newManager.split(' ')
                      db.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ?",
                        splitName,
                        function (err, res) {
                          if (err) throw err;
                          managerID = res[0].id
                          console.log(managerID, "Manager ID")
                          console.log(employeeID, "Employee ID")
                          db.query("UPDATE employee SET manager_id = ? WHERE id = ?",
                            [
                              managerID, employeeID
                            ],
                            function (err) {
                              if (err) throw err;
                              viewEmployee();
                            })
                        })
                    }
                  })
                break;
              case "Exit":
                mainFunction();
                break;
              // next line is end of switch
            }
          }
        }
      })
  })

}

// removeEmployee = () => {
//   db.query("SELECT * FROM employee", function(err, res){
//     if (err) throw err;
//     let employees = []
//     let employeeID
//     for (let i = 0; i < res.length; i++){
//       employees.push(res[i].first_name +" "+ res[i].last_name)
//       employeeID = res[i].id
//     }
//     inquirer
//     .prompt(
//       [
//         {
//           name: "removeEmployee",
//           type: "rawlist",
//           message: "Which employee would you like to remove?",
//           choices: employees
//         }
//       ]
//       )
//     .then(function(answers){
//       if(employees.includes(answers.removeEmployee)){
//         db.query("DELETE FROM employee WHERE id = ?", 
//       [
          
//             id = employeeID
          
        
//       ], 
//       function(err){
//         if(err) throw err;
//         // resetID();
//         viewEmployee();
//         mainFunction();
//       })
//       }
//     })
//   })
// }

// resetID = () => {
//   let id = [];
//   let nextID
//   db.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     for (let i = 0; i < res.length; i++) {
//       id.push(res[i].id);
//       nextID = id[id.length - 1] + 1;
//       console.log(id, "All ID's")
//       console.log(nextID, "Next ID")
//     }

//   })
//   db.query(`ALTER TABLE employee AUTO_INCREMENT = ${nextID}`, function (err) {
//     if (err) throw err;
//   })

// }







