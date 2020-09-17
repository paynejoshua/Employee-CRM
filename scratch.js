inquirer
.prompt(
[
  {
    name: "fullName",
    type: "input",
    message: "What is this employees new full name?",
  //   validate: (input) => {
  //     return new Promise((resolve, reject)=> {
  //       const words = input.split(' ')
  //       if (words.length !== 2) {
  //          reject('Please put space between first and last name');
  //       }
  //       resolve(true);
  //     })
      
  //  }
  }
])
.then(function(answer){
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
  function(err){
    if(err) throw err;
  })
})