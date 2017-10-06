const assert = require("chai").assert;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

const Streams = require("../models/streams");
const Users = require("../models/users");

describe("Test for Stream.js", () => {
  const userTestCase = {
    username: "test",
    email: "test@stream.com",
    password: "test"
  };
  const streamTestCast = {
    name: "testStream",
    url: "testUrl",
    location: "testLocation",
    resolution: "1080"
  };
  let user = {};
  before(async () => {
    await Users.create(userTestCase);
    user = await Users.getByUsername(userTestCase.username);
  });
  after(async () => {
    await Users.remove(userTestCase.username);
  });
  describe("Test for Streams.create()", () => {
    it("should create a stream", async () => {
      try {
        // const user = await Users.getByUsername(userTestCase.username);
        await Streams.create(
          Object.assign({}, streamTestCast, { owner: user._id })
        );
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("Test for Streams.getUserStreams", () => {
    it("should get alls streams a user has", async () => {
      try {
        // const user = await Users.getByUsername(userTestCase.username);
        const userStreams = await Streams.getUserStreams(user._id);
        assert.isArray(userStreams, "didn't return an array");
        assert.isNotEmpty(userStreams, "returned empty array");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should ");
  });
  describe("Test for Streams.getStream()", () => {
    it("should return a stream", async () => {});
  });
});
