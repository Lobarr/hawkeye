// const express = require("express");
const app = require("express")();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const port = process.env.SERVER_PORT || 5000;
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

//! Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
// app.use(express.static(path.resolve(__dirname, "public")));

//! routes
app.use(require("./api/router/open"));

app.listen(port, () => {
  console.warn(`Hawkeye server running on port ${port}`);
});
