const signale = require("signale");
const mongoose = require("mongoose");
const { MONGO_URL } = require("../config");

module.exports = async () => {
  try {
    const mongooseConfig = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      promiseLibrary: Promise,
    };

    await mongoose.connect(MONGO_URL, mongooseConfig);

    signale.log("Connected to database");
  } catch (error) {
    signale.fatal(new Error(`Failed to connect to db: ${error}`));
  }
};
