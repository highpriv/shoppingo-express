// ? Main Modules
require('dotenv').config()

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");

const cors = require("./utils/cors");
const rateLimit = require("./utils/rate-limit");

// ? Express application.
const app = express();



mongoose.connect(process.env.MongoDBURI, {
  useNewUrlParser: true,
});

app.use(cors);


app.use((req, res, next) => {
  res.locals.errors = [];
  next();
});

app.use(rateLimit);
app.use(helmet(require("./data/helmet.json"))); 

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: false, limit: "50mb" })); 

app.use("/public", express.static(path.join(__dirname, "public"))); 

app.use("/", require("./routes"));

app.use(function (req, res, next) {
  next(createError(404, "Not Found " + req.originalUrl));
});


module.exports = app;
