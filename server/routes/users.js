const express = require("express");

const Router = express.Router();
const mySqlConnection = require("../connection");
const authController = require('../controllers/auth')

Router.get("/", (req, res)=>{
  mySqlConnection.query("SELECT * from users", (err, rows, fields)=>{
  if(!err) {
    res.send(rows);
  } else {
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
