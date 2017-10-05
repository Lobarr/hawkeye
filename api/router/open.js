const open = require("express").Router();

open.get("/api/v1", (req, res) => {
  res.send({
    status: "running"
  });
});

module.exports = open;
