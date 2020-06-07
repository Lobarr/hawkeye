const {
  makeAgenda,
  makeApp,
  connectToDB,
  controllers,
} = require("./api/setup");
const { PORT } = require("./api/config");
const signale = require("signale");
const userTask = require("./api/modules/user/user.task");

(() => {
  // Connect to database
  Promise.resolve(connectToDB).catch((err) => signale.fatal(err));

  // Setup app
  const app = makeApp(controllers);

  // Create and register agenda tasks
  const agenda = makeAgenda([userTask]);

  app.locals["agendaInstance"] = agenda;

  agenda.on("ready", () => {
    app.listen(PORT, () => {
      signale.log(`Server running on port ${PORT}`);
    });
  });
})();
