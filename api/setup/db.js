const signale = require("signale");
const mongoose = require("mongoose");
const { MONGO_URL } = require("../config");

module.exports = () => {
  const mongooseConfig = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: require("bluebird"),
  };

  mongoose.connect(MONGO_URL, mongooseConfig, (err) => {
    if (err) {
      signale.fatal("Unable to connect to database", err);
    }

    signale.log("Connected to database");
  });
};
