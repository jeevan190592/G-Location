const express = require("express");
var cors = require('cors')
const Router = express.Router();
const mySqlConnection = require("../connection");
const multer = require('multer')
const fs = require('fs');


// Gallery
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


Router.get("/loadGallery/:id", (req, res) => {
  mySqlConnection.query("SELECT * from gallery where storeID = ?",[req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
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


// users

Router.post("/uploadProfileImage", cors(), upload.single("file"), (req, res) => {
  var body = req.body
  const file = req.file;
  if (file) {
    mySqlConnection.query("UPDATE users set image = ? where id = ? ",
      [req.file.filename, body.id], (err, rows, fields) => {
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

Router.get("/getAllusers", (req, res) => {
  mySqlConnection.query("SELECT * from users", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})

Router.post("/login", cors(), (req, res) => {
  var body = req.body;
  mySqlConnection.query('SELECT * from users where username = ? and binary password like ?', [body.userName, body.password], (err, rows, fields) => {
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
      console.log(err);
    }
  })
})

Router.post("/addUser", (req, res) => {
  var body = req.body;
  mySqlConnection.query("INSERT into users(username,name,email,password,store,role,phoneno) values(?, ?, ?, ?, ?, ?, ?)",
    [body.userID, body.name, body.email, body.password, body.store, body.role, body.phoneno], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})


Router.get("/getUserDetails/:id", (req, res) => {
  mySqlConnection.query("SELECT * from users where id = ?", [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send(rows[0]);
    } else {
      console.log(err);
    }
  })
})

Router.put("/updateUserDetails", (req, res) => {
  var body = req.body;
  mySqlConnection.query("Update users set name = ?, email = ?, phoneno = ?, password= ?,role = ?, username = ?, store = ?  where id = ?",
    [body.name, body.email, body.phoneno, body.password, body.role, body.username, body.store, body.id], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})

Router.put("/changePassword", (req, res) => {
  var body = req.body;
  mySqlConnection.query("Update users set password = ? where username = ?",
    [body.password, body.id], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})

Router.delete("/deleteUser/:id", (req, res) => {
  mySqlConnection.query('DELETE from users where id =?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send('success');
    } else {
      res.send('error');
      console.log(err);
    }
  })
})

// products
Router.get("/products/:storeid", (req, res) => {
  mySqlConnection.query("SELECT * from products where store_id = ?", [req.params.storeid], (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})

Router.put("/updateProduct", (req, res) => {
  var body = req.body.product;
  mySqlConnection.query("Update products set name = ?, weight = ?, barcode = ?, location = ?, price = ? where id = ?",
    [body.name, body.weight, body.barcode, body.location, body.price, body.id], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})

Router.post("/addProduct", (req, res) => {
  var body = req.body;
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

// store

Router.get("/getStoreDetails/:id", (req, res) => {
  mySqlConnection.query("SELECT * from stores where id = ?", [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send(rows[0]);
    } else {
      console.log(err);
    }
  })
})

Router.get("/getAllStoreDetails/", (req, res) => {
  mySqlConnection.query("SELECT * from stores", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})

Router.get("/getAllStoreDetailsWithName", (req, res) => {
  mySqlConnection.query("SELECT name from stores", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
})

Router.put("/updateStoreDetails", (req, res) => {
  var body = req.body;
  mySqlConnection.query("Update stores set name = ?, pincode = ?, phoneno = ?, address = ?, facebookURL = ?, twitterURL = ?, youtubeURL = ? where id = ?",
    [body.name, body.pincode, body.phoneno, body.address, body.fb, body.tw, body.yt, body.id], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log('error' + err);
      }
    })
})

Router.post("/addStore", (req, res) => {
  var body = req.body;
  mySqlConnection.query("INSERT into stores(name,pincode,address,phoneno,facebookURL,twitterURL,youtubeURL) values(?, ?, ?, ?, ?, ?, ?)",
    [body.name, body.pincode, body.address, body.phoneno, body.FB, body.twitter, body.youtube], (err, rows, fields) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('error');
        console.log(err);
      }
    })
})

Router.delete("/deleteStore/:id", (req, res) => {
  mySqlConnection.query('DELETE from stores where id =?', [req.params.id], (err, rows, fields) => {
    if (!err) {
      res.send('success');
    } else {
      res.send('error');
      console.log(err);
    }
  })
})

module.exports = Router;
