const express = require("express");
var cors = require('cors')
const Router = express.Router();
const mySqlConnection = require("../connection");
const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})



Router.post("/upload", cors(), upload.single("file"), (req, res) => {
  var body = req.body
  const file = req.file;
  if (file) {
    mySqlConnection.query("INSERT into gallery(title,description,storeID,filename) values(?, ?, ?, ?)",
      [body.title, body.description, body.storeID, req.file.filename], (err, rows, fields) => {
        if (!err) {

          res.send('success');
        } else {
          res.send('Error');
          console.log(err)
        }
      })
  } else {
    res.send('Error');
  }
})

Router.post("/login", cors(), (req, res) => {
  var body = req.body;
  mySqlConnection.query('SELECT * from users where name = ? and binary password like ?', [body.username, body.password], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})


Router.post("/register", (req, res) => {
  var body = req.body;
  var sql = "SET @user = ?;SET @email = ?;SET @id = ?;" +
    "CALL InsertAndUpdateUsers(@user,@email,@id);";
  mySqlConnection.query(sql, [body.user, body.email, body.id], (err, rows, fields) => {
    if (!err) {
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send('Inserted User ID :' + element[0].ID)
      })
    } else {
      console.log('Error');
    }
  })
})

Router.put("/register", (req, res) => {
  var body = req.body;
  var sql = "SET @user = ?;SET @email = ?;SET @id = ?;" +
    "CALL InsertAndUpdateUsers(@user,@email,@id);";
  mySqlConnection.query(sql, [body.user, body.email, body.id], (err, rows, fields) => {
    if (!err) {
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send('Updated User ID :' + element[0].ID)
      })
    } else {
      console.log('Error');
    }
  })
})

Router.get("/products", (req, res) => {
  mySqlConnection.query("SELECT * from products", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log('Error');
    }
  })
})

Router.get("/loadGallery/:id", (req, res) => {
  mySqlConnection.query("SELECT * from gallery where storeID = ?",[req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log('Error');
    }
  })
})

Router.put("/updateProduct", (req, res) => {
  var body = req.body.product;
  console.log(body);
  mySqlConnection.query("Update products set name = ?, weight = ?, barcode = ?, location = ?, price = ? where id = ?",
    [body.name, body.weight, body.barcode, body.location, body.price, body.id], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log('Error');
      }
    })
})

Router.post("/addProduct", (req, res) => {
  var body = req.body;
  console.log(body);
  mySqlConnection.query("INSERT into products(name,weight,barcode,store_id,location,price) values(?, ?, ?, ?, ?, ?)",
    [body.name, body.weight, body.barcode, body.store_id, body.location, body.price], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})

Router.delete("/deleteProduct/:id/:storeid", (req, res) => {
  mySqlConnection.query('DELETE from products where id =? and store_id =?', [req.params.id, req.params.storeid], (err, rows, fields) => {
    if (!err) {
      res.send('success');
    } else {
      res.send('error');
      console.log(err);
    }
  })
})

Router.delete("/deleteImage/:id/:storeid/:name", (req, res) => {
  mySqlConnection.query('DELETE from gallery where id =? and storeID =?', [req.params.id, req.params.storeid], (err, rows, fields) => {
    if (!err) {
      fs.unlinkSync(`uploads/${req.params.name}`);
      res.send('success');
    } else {
      res.send('error');
      console.log(err);
    }
  })
})






module.exports = Router;
