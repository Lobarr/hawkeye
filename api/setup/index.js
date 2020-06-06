const makeAgenda = require('./agendaFactory');
const makeApp = require('./appFactory');
const connectToDB = require('./db');

module.exports = {
  makeAgenda,
  makeApp,
  connectToDB
};
