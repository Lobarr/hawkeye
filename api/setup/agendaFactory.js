const agenda = require('agenda');
const registerTasks = require('../helpers/tasks');
const { MONGO_URL } = require('../config');

module.exports = () => {
  const agendaInstance = new agenda({
    db: {
      address: MONGO_URL
    },
    processEvery: '1 minute'
  });

  // Register tasks
  registerTasks(agendaInstance);

  return agendaInstance;
};
