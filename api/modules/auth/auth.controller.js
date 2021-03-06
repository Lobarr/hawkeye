const authController = require("express").Router();
const userService = require("../user/user.service");
const httpStatus = require("http-status-codes");
const http = require("http");

/**
 * @api {post} /login Login to the system
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
 *  "status": "Incomplete Request"
 * }
 */
authController.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: http.STATUS_CODES[httpStatus.BAD_REQUEST],
      });
    }

    const token = await userService.validate(username, password);

    res.send({
      status: http.STATUS_CODES[httpStatus.OK],
      data: { token },
    });
  } catch (error) {
    switch (error.message) {
      case "Unauthorized":
        res.status(httpStatus.UNAUTHORIZED).send({ status: error.message });
        break;

      case "Invalid User":
        res.status(httpStatus.UNAUTHORIZED).send({ status: error.message });
        break;

      default:
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ status: error.message });
        break;
    }
  }
});

/**
 * @api {post} /signup Signup to the system
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
 *  "status": "Incomplete Request"
 * }
 */
authController.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ status: "Incomplete Request" });
    }

    await userService.create({ username, email, password });

    res.send({ status: "Success" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

module.exports = authController;
