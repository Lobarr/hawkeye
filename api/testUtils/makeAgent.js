const { makeApp, controllers, makeAgenda } = require("../setup");
const chai = require("chai");

chai.use(require("chai-http"));

module.exports = () => {
  const app = makeApp(controllers);

  app.locals["agendaInstance"] = makeAgenda();

  return chai.request(app);
};
