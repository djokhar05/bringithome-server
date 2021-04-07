const express = require("express");
const app = express()

//Short hand to Grab the database connect func and call it immediately;
require("./common/db/dbConnect")("bringithome");


//Routes
const getStores = require("./routes/getStores");
const sortStores = require("./routes/sortStores");

app.use("/", getStores);
app.use("/", sortStores);

app.listen(5000)
console.log("Bring-it-home Server Started on Port:5000")