const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

before(async () => {
  const mongoUrl = await mongod.getConnectionString();

  await mongoose.connect(mongoUrl, {
    promiseLibrary: require("bluebird"),
  });
});

after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
