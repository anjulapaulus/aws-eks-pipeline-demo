const mysql = require("mysql");

const configs = require("./config.js");

// Create a connection to the database
var connection = mysql.createConnection({
    host     : configs.database.host,
    port: configs.database.port,
    user     : configs.database.user,
    password : configs.database.password,
    database: configs.database.database
  });
  
connection.connect(function(err) {
    if (err) {
      return;
    }
});

module.exports = connection;