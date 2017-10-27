const auth = require("express").Router();
const Users = require("../models/users");

/**
 * @api {post} /api/v1/login Login to the system
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 0.0.1
 * @apiParam {string} username Username
 * @apiParam {string} password Password
 * @apiParamExample {json} Example request 
 * {
 *  "username": "example",
 *  "password": "example"
 * }
 * @apiSuccess {string} token JWT for auth
 * @apiSuccessExample Example data on success:
 * {
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiError (Unauthorized 401) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "IncompleteRequest"
 * }
 */
auth.post("/api/v1/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const token = await Users.validate(username, password);
      res.send({ token });
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    switch (error.message) {
      case "Unauthorized":
        res.status(401).send({ status: error.message });
        break;
      case "InvalidUser":
        res.status(401).send({ status: error.message });
        break;
      default:
        res.status(500).send({ status: error.message });
        break;
    }
  }
});

/**
 * @api {post} /api/v1/signup Signup to the system
 * @apiName Signup
 * @apiGroup Auth
 * @apiVersion 0.0.1
 * @apiParam {string} username Username
 * @apiParam {string} password Password
 * @apiParam {string} email Email
 * @apiParamExample {json} Example request 
 * {
 *  "username": "example",
 *  "password": "example"
 *  "email": "test@test.com",
 * }
 * @apiSuccess {string} status Status of the request
 * @apiSuccessExample Example data on success:
 * {
 *  "status": "Success"
 * }
 * @apiError (Bad Request 400) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "IncompleteRequest"
 * }
 */
auth.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      await Users.create({ username, email, password });
      res.send({ status: "Success" });
    } else {
      res.status(400).send({ status: "IncompleteRequest" });
    }
  } catch (error) {
    res.status(500).send({ status: error.message });
  }
});

module.exports = auth;
