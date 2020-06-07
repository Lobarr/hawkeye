const http = require("http");
const httpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const userService = require("../user/user.service");

/**
 * Auth middleware that authenticates users
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-hawkeye-token"];

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: "No token provided",
      });
    }

    const { username } = jwt.decode(token);
    const user = await userService.getByUsername(username);

    if (user.token !== token) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: http.STATUS_CODES[http.UNAUTHORIZED],
      });
    }

    req.user = Object.assign({}, user._doc);

    return next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: error.message,
    });
  }
};
