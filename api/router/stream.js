const stream = require("express").Router();
const Streams = require("../models/streams");
const Utils = require("../helpers/utils");

stream.use(Utils.middlewares.auth); // auth middleware

//TODO: create stream endpoint
//TODO: update stream endpoint
//TODO: get stream endpoint
//TODO: get users streams endpoint
//TODO: remove stream endpoint

stream.post("/api/v1/stream/create", async (req, res) => {
  try {
    const { name, url, location, resolution, owner } = req.body;
    if (name && url && location && resolution && owner) {
      await Streams.create({
        name,
        url,
        location,
        resolution,
        owner
      });
    } else {
      res.status(400).send({
        status: "IncompleteRequest"
      });
    }
  } catch (error) {
    res.status(500).send({
      status: error.message
    });
  }
});

stream.patch("/api/v1/stream/:id", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      status: error.message
    });
  }
});

stream.get("/api/v1/stream/:id", async (req, res) => {});

stream.get("/api/v1/stream/me", async (req, res) => {});
stream.delete("/api/v1/stream/:id", async (req, res) => {});

module.exports = stream;
