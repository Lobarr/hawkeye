const user = require("express").Router();
const Users = require("../models/users");
const Utils = require("../helpers/utils");

//TODO: update endpoint
//TODO: remove user endpoint

user.use(Utils.middlewares.auth); //auth middleware

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
    res.send({
      user: { _id, username, email }
    });
  } catch (error) {
    res.status(500).send({
      status: error.message
    });
  }
});

module.exports = user;
