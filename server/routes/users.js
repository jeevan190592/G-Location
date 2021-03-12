const express = require("express");
var cors = require('cors')
const Router = express.Router();
const mySqlConnection = require("../connection");

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

Router.get("/products", (req, res)=>{
  mySqlConnection.query("SELECT * from products", (err, rows, fields)=>{
  if(!err) {
    res.send(rows);
  } else {
    console.log('Error');
  }
})
})

Router.put("/updateProduct", (req, res)=>{
  var body = req.body.product;
  console.log(body);
  mySqlConnection.query("Update products set name = ?, weight = ?, barcode = ?, location = ?, price = ? where id = ?",
    [body.name, body.weight, body.barcode, body.location, body.price, body.id], (err, rows, fields)=>{
    if(!err) {
      res.send('success');
    } else {
      res.send('error');
      console.log('Error');
    }
  })
})

Router.get("/:id", (req, res)=>{
  mySqlConnection.query('SELECT * from users where id =?',[req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log('Error');
    }
  })
})

Router.delete("/:id", (req, res)=>{
  mySqlConnection.query('DELETE from users where id =?',[req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send('Deleted Successfully');
    } else {
      console.log('Error');
    }
  })
})


Router.post("/logsin", (req, res)=>{
  var body = req.body;
  var sql = "SET @username = ?;SET @password = ?; CALL CheckLoginUser(@user,@email);";
  mySqlConnection.query(sql,[body.username, body.password], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
      /*rows.forEach(element => {
        if(element.constructor == Array)
          res.send('Inserted User ID :' +element[0].ID)
      })*/
    } else {
      console.log('Error');
    }
  })
})








module.exports = Router;
