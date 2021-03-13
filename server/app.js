const express = require("express");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/users");
const multer  = require('multer')
var cors = require('cors')
var app = express();

app.use(express.static(__dirname + '/uploads/'));

app.use(bodyParser.json());
app.use(cors())
app.use("/api", UserRoutes);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb( null , "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage})



app.post("/api/uplsoad", upload.single("file"), (req, res) => {
  console.log('triggered');
  const file = req.file;

  if(file) {
    res.json(file);
  } else {
    throw new Error("File upload error");
  }
})

app.listen(3000);
