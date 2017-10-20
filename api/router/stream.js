const stream = require("express").Router();
const Streams = require("../models/streams");
const Utils = require("../helpers/utils");

stream.use(Utils.middlewares.auth); // auth middleware

//TODO: create stream endpoint
//TODO: update stream endpoint
//TODO: get stream endpoint
//TODO: get users streams endpoint
//TODO: remove stream endpoint

stream.post("/api/v1/stream/create", async (req, res) => {});

stream.patch("/api/v1/stream/:id", async (req, res) => {
  res.send(req.params.id);
});

stream.get("/api/v1/stream/:id", async (req, res) => {});

stream.get("/api/v1/stream/me", async (req, res) => {});
stream.delete("/api/v1/stream/:id", async (req, res) => {});

module.exports = stream;
