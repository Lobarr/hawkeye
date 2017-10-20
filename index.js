require("dotenv").config();
const express = require("express");
const app = require("express")();
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
app.use(morgan("short"));

// serves react production build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("/", (req, res) => {
    res.send("./client/build/index.html");
  });
}

//! routes
app.use(require("./api/router/status"));
app.use(require("./api/router/auth"));
app.use(require("./api/router/stream"));
app.use(require("./api/router/user"));

app.listen(port, () => {
  console.log(`Hawkeye server running on port ${port}`);
});
