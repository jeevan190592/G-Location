const express = require("express");
var cors = require('cors')
const Router = express.Router();
const mySqlConnection = require("../connection");

Router.get("/product", (req, res)=>{
  mySqlConnection.query("SELECT * from products", (err, rows, fields)=>{
    if(!err) {
      console.log(rows)
      res.send(rows);
    } else {
      console.log('Error retreiving products');
    }
  })
})

Router.post("/login", cors(), (req, res)=>{
  var body = req.body;
  mySqlConnection.query('SELECT * from users where name = ? and binary password like ?',[body.username, body.password], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})


Router.post("/register", (req, res)=>{
  var body = req.body;
  var sql = "SET @user = ?;SET @email = ?;SET @id = ?;" +
    "CALL InsertAndUpdateUsers(@user,@email,@id);";
  mySqlConnection.query(sql,[body.user, body.email, body.id], (err, rows, fields)=>{
    if(!err) {
      rows.forEach(element => {
        if(element.constructor == Array)
          res.send('Inserted User ID :' +element[0].ID)
      })
    } else {
      console.log('Error');
    }
  })
})

Router.put("/register", (req, res)=>{
  var body = req.body;
  var sql = "SET @user = ?;SET @email = ?;SET @id = ?;" +
    "CALL InsertAndUpdateUsers(@user,@email,@id);";
  mySqlConnection.query(sql,[body.user, body.email, body.id], (err, rows, fields)=>{
    if(!err) {
      rows.forEach(element => {
        if(element.constructor == Array)
          res.send('Updated User ID :' +element[0].ID)
      })
    } else {
      console.log('Error');
    }
  })
})



module.exports = Router;
