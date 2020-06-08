const chai = require("chai");
const controllers = require("../setup/controllers");
const makeAgenda = require("../setup/agendaFactory");
const makeApp = require("../setup/appFactory");
const userTask = require("../modules/user/user.task");

chai.use(require("chai-http"));

module.exports = () => {
  const app = makeApp(controllers);

  app.locals["agendaInstance"] = makeAgenda([userTask]);

  return chai.request(app);
};
