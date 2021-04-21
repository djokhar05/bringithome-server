const express = require("express");
const app = express()

//Short hand to Grab the database connect func and call it immediately;
require("./common/db/dbConnect")("bringithome");


//Routes
const getStores = require("./routes/getStores");
const sortStores = require("./routes/sortStores");
const foodSort = require("./routes/foodSort");

app.use("/", getStores);
app.use("/", sortStores);
app.use("/", foodSort);

app.listen(process.env.PORT || 5000)
console.log("Bring-it-home Server Started on Port:5000")