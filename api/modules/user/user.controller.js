const { makeAgenda } = require("../../setup");
const authMiddleware = require("../auth/auth.middleware");
const http = require("http");
const httpStatus = require("http-status-codes");
const router = require("express").Router();
const streamService = require("../stream/stream.service");
const userService = require("./user.service");

const agenda = makeAgenda();

router.use(authMiddleware); // auth middleware

/**
 * @api {get} /user/me Get user info
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
router.get("/user/me", async (req, res) => {
  try {
    const { _id, username, email } = await userService.getByUsername(
      req.user.username
    );

    res.send({
      status: http.STATUS_CODES[httpStatus.OK],
      data: { _id, username, email },
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {delete} /user/me Delete a user
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
router.delete("/user/me", async (req, res) => {
  try {
    const { username } = req.user;

    await userService.remove(username);
    agenda.now("delete user streams", { id: req.user._id });

    res.send({ status: http.STATUS_CODES[httpStatus.OK] });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

/**
 * @api {patch} /user/me Update user info
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
router.patch("/user/me", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(httpStatus.BAD_REQUEST).send({ status: "Incomplete Request" });
    }

    const user = await userService.updateUsername(req.user.username, username);

    res.send({
      status: http.STATUS_CODES[httpStatus.OK],
      data: user,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: error.message });
  }
});

module.exports = router;
