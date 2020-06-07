const makeAgenda = require("./agendaFactory");
const makeApp = require("./appFactory");
const connectToDB = require("./db");
const controllers = require("./controllers");

module.exports = {
  connectToDB,
  controllers,
  makeAgenda,
  makeApp,
};
