const { makeAgenda, makeApp, connectToDB } = require("./api/setup");
const { PORT } = require("./api/config");
const authController = require("./api/modules/auth/auth.controller");
const healthzController = require("./api/modules/healthz/healthz.controller");
const signale = require("signale");
const streamController = require("./api/modules/stream/stream.controller");
const userController = require("./api/modules/user/user.controller");
const userTask = require("./api/modules/user/user.task");

(() => {
  // Connect to database
  Promise.resolve(connectToDB).catch((err) => signale.fatal(err));

  // Setup app
  const app = makeApp([
    healthzController,
    authController,
    streamController,
    userController,
  ]);

  // Create and register agenda tasks
  const agenda = makeAgenda([userTask]);

  agenda.on("ready", () => {
    app.listen(PORT, () => {
      signale.log(`Server running on port ${PORT}`);
    });
  });
})();
