let connection = require("./connection");

let orm = {
  // The last letiable cb represents the anonymous function being passed from server.js
  selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
    let queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertInto: function(tableInput, colToSearch, valOfCol, cb) {
      let queryString = "INSERT INTO ? values ?";
      connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result){
          if(err) throw err;
          cb(result);
      });
  },

};

module.exports = orm;
