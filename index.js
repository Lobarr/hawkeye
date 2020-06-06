// require('dotenv').config();
// const { DB, NODE_ENV, SERVER_PORT } = process.env;
// const Agenda = require('agenda');
// const express = require('express');
// const app = require('express')();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const path = require('path');
// const agenda = new Agenda({
//   db: {
//     address: DB
//   },
//   processEvery: '1 minute'
// });
// const Tasks = require('./api/helpers/tasks');
// const port = SERVER_PORT || 5000;
// const mongoose = require('mongoose').connect(DB, {
//   useMongoClient: true,
//   promiseLibrary: require('bluebird')
// });

// //! Middlewares
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(helmet());
// app.use(cors());

// // logging requests on dev environment
// if (NODE_ENV === 'dev') {
//   app.use(morgan('short'));
// }

// // serves react production build
// if (NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/client/build')));
//   app.get('/', (req, res) => {
//     res.send('./client/build/index.html');
//   });
// } 

// //! routes
// app.use(require('./api/router/status'));
// app.use(require('./api/router/auth'));
// app.use(require('./api/router/stream'));
// app.use(require('./api/router/user'));


// Tasks(agenda); //! Job Scheduler

// agenda.on('ready', () => {
//   agenda.start();
//   app.listen(port, () => {
//     if (NODE_ENV === 'dev') {
//       console.log(`Hawkeye server running on port ${port}`);
//     }
//   });
// });

// module.exports = app; //? exported for integration testing

const signale = require('signale');
const makeApp = require('./api/setup/appFactory');
const connectToDB = require('./api/setup/db');
const statusRouter = require('./api/router/status');
const authRouter = require('./api/router/auth');
const streamRouter = require('./api/router/stream');
const userRouter = require('./api/router/user');
const makeAgenda = require('./api/setup/agendaFactory');
const { PORT } = require('./api/config');

function startServer() {
  // Connect to database
  Promise.resolve(connectToDB).catch(err => signale.fatal(err));
  
  // Setup app
  const app = makeApp([
    statusRouter,
    authRouter,
    streamRouter,
    userRouter
  ]);
  
  // Create and register agenda tasks
  const agenda = makeAgenda();
  
  agenda.on('ready', () => {
    app.listen(PORT, () => {
      signale.log(`Server running on port ${PORT}`);
    })
  });
};

startServer();
