const agenda = require("agenda");
const { MONGO_URL } = require("../config");

let agendaInstance;

module.exports = (tasks = []) => {
  if (!agendaInstance) {
    agendaInstance = new agenda({
      db: {
        address: MONGO_URL,
      },
      processEvery: "1 minute",
    });

    // Register tasks
    for (task of tasks) {
      task(agendaInstance);
    }

    return agendaInstance;
  }

  return agendaInstance;
};
