const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const { PORT, NODE_ENV } = require('../config');


module.exports = (controllers = [], middlewares = []) => {
  const app = express();

  // Compress Application response bodies
  app.use(compression());

  // Parse incoming request bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Configure security headers
  app.use(helmet());

  // Enable Cross-Origin Resource Sharing
  app.use(cors());

  // Enable logging for development environment
  if (NODE_ENV === 'development') morgan('short');

  // Attach provided controllers
  for (const controller of controllers) {
    app.use(controller);
  }

  // Attach provided middlewares
  for (const middleware of middlewares){
    app.use(middleware);
  }

  return app;
};
