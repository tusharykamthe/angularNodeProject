require("dotenv").config();

const express = require("express");
const app = express();

//morgan
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const username = process.env.dbuser;
const password = process.env.dbpassword;

const connectionString =
  "mongodb+srv://user1:User123@e-commercecluster.grfxx5z.mongodb.net/EcommDB";

mongoose.connect(connectionString);

// const productRouter=require('./api/routes/products')
// const orderRouter=require('./api/routes/order')

app.use(bodyParser.json({ limit: "1gb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1gb" }));

const cors = require("cors");

app.use(cors());

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, x-auth-token, x-l10n-locale, Cache-Control, timeout"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.use(morgan("dev")); //dev is one of the predefined formats for the morgan
// app.use('/products',productRouter)
// app.use('/order',orderRouter)
app.use(require("./route.js"));
module.exports = app;
