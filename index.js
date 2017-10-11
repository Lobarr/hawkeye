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

//! routes
app.use(require("./api/router/status"));
app.use(require("./api/router/auth"));
app.use(require("./api/router/user"));
app.use(require("./api/router/stream"));

app.listen(port, () => {
  console.log(`Hawkeye server running on port ${port}`);
});
