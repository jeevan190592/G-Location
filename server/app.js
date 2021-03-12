const express = require("express");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/users");
var cors = require('cors')
var app = express();

app.use(bodyParser.json());
app.use(cors())
app.use("/api", UserRoutes);



app.listen(3000);
