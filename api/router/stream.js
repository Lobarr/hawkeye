const mongoose = require("mongoose");
const _ = require("underscore");
const stream = require("express").Router();
const Streams = require("../models/streams");
const Users = require("../models/users");
const Middlewares = require("../helpers/middlewares");

stream.use(Middlewares.auth); // auth middleware

/**
 * @api {post} /api/v1/stream Create stream
 * @apiName CreateStream
 * @apiGroup Stream
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiParam {string} name Name of stream
 * @apiParam {string} url RTMP url of stream
 * @apiParam {string} location Location of stream
 * @apiParam {string="720p", "D1"} resolution Resolution of stream
 * @apiParamExample {json} Example request 
 * {
 *  "name": "ExampleName",
 *  "url": "rtmp://example.com/vod/mp4:myFolder/myVideo.mp4",
 *  "location": "ExampleLocation",
 *  "resolution": "720p"
 * }
 * @apiSuccess {string} status Status of the request
 * @apiSuccessExample Example data on success:
 * {
 *  "status": "success"
 * }
 * @apiError (Bad Request 400) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
stream.post("/api/v1/stream", async (req, res) => {
  try {
    const { name, url, location, resolution } = req.body;
    if (name && url && location && resolution) {
      const streams = await Streams.getUserStreams(req.user._id);
      if (streams.length < 6) {
        if (resolution === "720p" || resolution === "D1") {
          await Streams.create({
            name,
            url,
            location,
            resolution,
            owner: req.user._id
          });
          res.send({ status: "success" });
        } else {
          res.status(400).send({ status: "Invalid resolution" });
        }
      } else {
        res.status(400).send({
          status: "You have reached the maximum limit of streams allowed"
        });
      }
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    res.status(400).send({ status: error.message });
  }
});

/**
 * @api {patch} /api/v1/stream Update stream
 * @apiName UpdateStream
 * @apiGroup Stream
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiParam {string} id Unique ID of the stream
 * @apiParam {string} [name] Name of stream 
 * @apiParam {string} [url] RTMP url of stream 
 * @apiParam {string} [location] Location of stream 
 * @apiParam {string="720p", "D1"} [resolution] Resolution of stream
 * @apiParamExample {json} Example request:
 * {
 *  "id": "59ea9e09d32a9526282569fe",
 *  "name": "ExampleName",
 *  "url": "rtmp://example.com/vod/mp4:myFolder/myVideo.mp4",
 *  "location": "ExampleLocation",
 *  "resolution": "720p"
 * }
 * @apiSuccess {string} status Status of request 
 * @apiSuccessExample {json} Example data on success:
 * {
 *  "status": "success"
 * }
 * @apiError (Unauthorized 401 / InternalServerError 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
stream.patch("/api/v1/stream", async (req, res) => {
  try {
    const { id, name, url, location, resolution } = req.body;
    if (id && name && url && location && resolution) {
      const stream = await Streams.getStream(id);
      const owner = await Users.getByID(stream.owner);
      if (owner.username === req.user.username) {
        await Streams.update({ id, name, url, location, resolution });
      } else {
        res.status(401).send({ status: "Unauthorized" });
      }
      res.send({ status: "success" });
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

/**
 * @api {get} /api/v1/stream/:id Get stream 
 * @apiName GetStream
 * @apiGroup Stream
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiParam {string} id Unique ID of stream at the end of the url
 * @apiSuccess {string} _id Stream unique ID
 * @apiSuccess {string} name Name of stream
 * @apiSuccess {string} url RTMP url of stream
 * @apiSuccess {string} location Location of stream
 * @apiSuccess {string} resolution Resolution of stream
 * @apiSuccessExample Example data on success:
 * {
 *   "_id": "59ea9e09d32a9526282569fe",
 *   "name": "Example",
 *   "url": "rtmp://example.com/vod/mp4:myFolder/myVideo.mp4",
 *   "location": "Gym5",
 *   "resolution": "720p",
 * }
 * @apiError (Unauthorized 401 / Internal Server Error 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
stream.get("/api/v1/stream/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const stream = await Streams.getStream(id);
      const owner = await Users.getByID(stream.owner);
      if (owner.username === req.user.username) {
        res.send(_.omit(stream._doc, "owner", "__v"));
      } else {
        res.status(401).send({ status: "Unauthorized" });
      }
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

/**
 * @api {delete} /api/v1/stream/:id Delete stream
 * @apiName DeleteStream
 * @apiGroup Stream
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiParam {string} id Unique ID of stream at the end of the url
 * @apiSuccess {string} status Status of the request
 * @apiSuccessExample Example data on success:
 * {
 *  "status": "success"
 * }
 * @apiError (Unauthoried 401 / Internal Server Error 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
stream.delete("/api/v1/stream/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const stream = await Streams.getStream(id);
      const owner = await Users.getByID(stream.owner);
      if (owner.username === req.user.username) {
        await Streams.remove(id);
        res.send({ status: "success" });
      } else {
        res.status(401).send({ status: "Unauthorized" });
      }
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

/**
 * @api {get} /api/v1/streams Get User's Streams
 * @apiName GetStreams
 * @apiGroup Stream
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiSuccess {array} streams Array of user's streams
 * @apiSuccessExample Example data on success:
 * [
 *  {
 *    "_id": "59ea9e09d32a9526282569fe",
 *    "name": "Example",
 *    "url": "rtmp://example.com/vod/mp4:myFolder/myVideo.mp4",
 *    "location": "Gym5",
 *    "resolution": "720p",
 *  },
 *  {
 *     "_id": "59ea9e09d32a9526282569fe",
 *     "name": "Example",
 *     "url": "rtmp://example.com/vod/mp4:myFolder/myVideo.mp4",
 *     "location": "Gym5",
 *     "resolution": "720p",
 *   }
 * ]
 * @apiError (Internal Server Error 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
stream.get("/api/v1/streams", async (req, res) => {
  try {
    const streams = await Streams.getUserStreams(req.user._id);
    res.send(streams);
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

module.exports = stream;
