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