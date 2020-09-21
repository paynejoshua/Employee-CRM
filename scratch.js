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
                    .then(function(answer){
                      let roleID;
                      for (let i = 0; i < role.length; i++){
                        if(role[i].title === answer.newRole){
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
                          function(err){
                            if(err) throw err;
                          })
                          viewEmployee();
                        }
                      }
                    })
                  })
                  break;