const makeAgenda = require("./api/setup/agendaFactory");
const makeApp = require("./api/setup/appFactory");
const connectToDB = require("./api/setup/db");
const controllers = require("./api/setup/controllers");
const { PORT } = require("./api/config");
const signale = require("signale");
const userTask = require("./api/modules/user/user.task");

(() => {
  // Connect to database
  connectToDB();

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
