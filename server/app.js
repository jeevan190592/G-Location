const express = require("express");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/users");
var cors = require('cors')
var app = express();

app.use(bodyParser.json());
app.use(cors())
app.use("/api", ApiRoutes);



app.listen(3000);
