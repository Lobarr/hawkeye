const authController = require("../modules/auth/auth.controller");
const healthzController = require("../modules/healthz/healthz.controller");
const streamController = require("../modules/stream/stream.controller");
const userController = require("../modules/user/user.controller");

module.exports = [
  healthzController,
  authController,
  streamController,
  userController,
];
