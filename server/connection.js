const mysql = require("mysql");
var mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "g-location",
  multipleStatements: true
});

mySqlConnection.connect((err)=> {
  if(!err){
    console.log('connected to Database');
  } else {
    console.log('connection failed');
  }
})

module.exports = mySqlConnection;
