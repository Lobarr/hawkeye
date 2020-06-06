const mongoose = require("mongoose");

before(async () => {
  console.log("in here");

  const mongoServer = new MongoMemoryServer();
  const mongoUrl = await mongoServer.getUri();

  await mongoose.connect(mongoUrl, {
    promiseLibrary: Promise,
  });
});
