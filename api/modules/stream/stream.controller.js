const _ = require("underscore");
const authMiddleware = require("../auth/auth.middleware");
const streamController = require("express").Router();
const streamService = require("./stream.service");
const userService = require("../user/user.service");
const httpStatus = require("http-status-codes");
const http = require("http");

streamController.use("/stream", authMiddleware); // auth middleware

/**
 * @api {post} /stream Create stream
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
streamController.post("/stream", async (req, res) => {
  try {
    const { name, url, location, resolution } = req.body;

    if (
      name === undefined ||
      url === undefined ||
      location === undefined ||
      resolution === undefined
    ) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Incomplete Request" });
    }
    const streamsCount = await streamService.getUserStreamsCount(req.user._id);
    if (streamsCount >= 6) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: "You have reached the maximum limit of streams allowed",
      });
    }

    if (!(resolution === "720p" || resolution === "D1")) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Invalid resolution" });
    }

    await streamService.create({
      name,
      url,
      location,
      resolution,
      owner: req.user._id,
    });

    res.send({ status: http.STATUS_CODES[httpStatus.OK] });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {patch} /stream Update stream
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
streamController.patch("/stream", async (req, res) => {
  try {
    const { id, name, url, location, resolution } = req.body;

    if (!(id && name && url && location && resolution)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Incomplete Request" });
    }

    const stream = await streamService.getStream(id);
    const owner = await userService.getByID(stream.owner);

    if (owner.username !== req.user.username) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: http.STATUS_CODES[httpStatus.UNAUTHORIZED],
      });
    }

    await streamService.update({ id, name, url, location, resolution });

    res.send({ status: http.STATUS_CODES[httpStatus.OK] });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {get} /stream/:id Get stream
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
streamController.get("/stream/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Incomplete Request" });
    }

    const stream = await streamService.getStream(id);
    const owner = await userService.getByID(stream.owner);

    if (owner.username !== req.user.username) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: http.STATUS_CODES[httpStatus.UNAUTHORIZED],
      });
    }

    res.send({
      status: http.STATUS_CODES[httpStatus.OK],
      data: _.omit(stream, "owner", "__v"),
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {delete} /stream/:id Delete stream
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
streamController.delete("/stream/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    if (!id) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Incomplete Request" });
    }

    const stream = await streamService.getStream(id);
    const owner = await userService.getByID(stream.owner);

    if (owner.username !== user.username) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: http.STATUS_CODES[httpStatus.UNAUTHORIZED],
      });
    }

    await streamService.remove(id);

    res.send({ status: http.STATUS_CODES[httpStatus.OK] });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {get} /streams Get User's Streams
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
streamController.get("/stream", async (req, res) => {
  try {
    const { user } = req;

    const streams = await streamService.getUserStreams(user._id);

    res.send({
      status: http.STATUS_CODES[httpStatus.OK],
      data: streams,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

module.exports = streamController;
