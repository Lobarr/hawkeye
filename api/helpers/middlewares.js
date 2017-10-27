require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const Middlewares = {
  /**
   * An auth middleware that verifies token
   * 
   * @param {any} req 
   * @param {any} res 
   * @param {any} next 
   * @returns 
   */
  async auth(req, res, next) {
    try {
      //!FIXME: make functional
      const token = req.headers["x-hawkeye-token"];
      if (!token) {
        return res.status(401).send({
          status: "No token passed"
        });
      }
      const { username } = jwt.decode(token);
      const user = await Users.getByUsername(username);
      if (user.token !== token) {
        return res.status(401).send({
          status: "Unauthorized"
        });
      }
      req.user = Object.assign({}, user._doc);
      return next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).send({
        status: "Unauthorized"
      });
    }
  }
};

module.exports = Middlewares;
