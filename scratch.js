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


// 

inquirer
.prompt([
  {
    name: "newRole",
    type: "rawList",
    message: "What is this employees new Role?",
    choices: roleChoice
  }
])
.then(function (answer){
 
  db.query("UPDATE employee SET ? WHERE ?",
  [
    {
      role: answer.newRole
    },
    {
      id: employeeID
    }
    
  ],
  function (err) {
    if(err) throw err;
  })
  viewEmployee();
})