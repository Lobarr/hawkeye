require("dotenv").config();
const Agenda = require("agenda");
const agenda = new Agenda({
  db: {
    address: process.env.DB
  },
  processEvery: "1 minute"
});
const user = require("express").Router();
const Users = require("../models/users");
const Streams = require("../models/streams");
const Middlewares = require("../helpers/middlewares");

user.use(Middlewares.auth); // auth middleware

/**
 * @api {get} /api/v1/user/me Get user info
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiSuccess {string} _id Users unique ID
 * @apiSuccess {string} username Username
 * @apiSuccess {string} email Email
 * @apiSuccessExample Example data on success:
 * {
 *  "_id": "eyJhbGciOiJIUzI1NiIs",
 *  "username": "test",
 *  "email": "test@test.com"
 * }
 * @apiError (Unauthorized 401 / InternalServerError 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
user.get("/api/v1/user/me", async (req, res) => {
  try {
    const { _id, username, email } = await Users.getByUsername(
      req.user.username
    );
    res.send({ _id, username, email });
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

/**
 * @api {delete} /api/v1/user/me Delete a user
 * @apiName RemoveUser
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiSuccess {string} status Status
 * @apiSuccessExample Example data on success:
 * {
 *  "status": "success"
 * }
 * @apiError (Unauthorized 401 / InternalServerError 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
user.delete("/api/v1/user/me", async (req, res) => {
  try {
    agenda.now("delete user streams", { id: req.user._id });
    await Users.remove(req.user.username);
    res.send({ status: "Success" });
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

/**
 * @api {patch} /api/v1/user/me Update user info
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 0.0.1
 * @apiParam {string} username New Username
 * @apiParamExample {json} Example Request
 * {
 *  "username": "SomethingNew"
 * }
 * @apiHeader {string} x-hawkeye-token Users unique token
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "x-hawkeye-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiSuccess {string} _id Users unique ID
 * @apiSuccess {string} username Username
 * @apiSuccess {string} email Email
 * @apiSuccess {string} token Unique updated token
 * @apiSuccessExample Example data on success:
 * {
 *  "_id": "eyJhbGciOiJIUzI1NiIs",
 *  "username": "test",
 *  "email": "test@test.com", 
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiError (Unauthorized 401 / InternalServerError 500) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "some error message"
 * }
 */
user.patch("/api/v1/user/me", async (req, res) => {
  try {
    const { username } = req.body;
    if (username) {
      const user = await Users.updateUsername(req.user.username, username);
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

module.exports = user;
