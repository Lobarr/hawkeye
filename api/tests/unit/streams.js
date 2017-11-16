require("dotenv").config();
const assert = require("chai").assert;
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: require("bluebird")
});

const Streams = require("../../models/streams");
const Users = require("../../models/users");

describe("Test for Stream.js", () => {
  const userTestCase = {
    username: "test",
    email: "test@stream.com",
    password: "test"
  };
  const streamTestCase = {
    name: "testStream",
    url: "rtmp://testUrl",
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
        await Streams.create(
          Object.assign({}, streamTestCase, { owner: user._id })
        );
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("Test for Streams.getUserStreams()", () => {
    const noStreamUserInit = {
      username: "nostreams",
      email: "nostreams@test.com",
      password: "test"
    };
    let noStreamUser = {};
    before(async () => {
      await Users.create(noStreamUserInit);
      noStreamUser = await Users.getByUsername(noStreamUserInit.username);
    });
    after(async () => {
      await Users.remove(noStreamUserInit.username);
    });
    it("should get all streams a user has", async () => {
      try {
        const user = await Users.getByUsername(userTestCase.username);
        const userStreams = await Streams.getUserStreams(user._id);
        assert.isArray(userStreams, "didn't return an array");
        assert.isNotEmpty(userStreams, "returned empty array");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw Invalid ID", async () => {
      try {
        const streams = await Streams.getUserStreams("Invalid ID");
        assert.isOk(false, "didn't throw an error");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.strictEqual(
          error.message,
          "Invalid ID",
          "didn't return the right error message"
        );
      }
    });
  });
  describe("Test for Streams.getStream()", () => {
    let userStreams = [];
    before(async () => {
      userStreams = await Streams.getUserStreams(user._id);
    });
    it("should return a stream", async () => {
      try {
        const stream = await Streams.getStream(userStreams[0]._id);
        assert.isObject(stream, "didn't return an object");
        assert.strictEqual(stream.url, userStreams[0].url, "url didn't match");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("Test for Streams.update()", () => {
    let userStreams = [];
    before(async () => {
      userStreams = await Streams.getUserStreams(user._id);
    });
    it("should update a stream", async () => {
      try {
        await Streams.update({
          id: userStreams[0]._id,
          name: "updatesStreamName",
          location: "rez"
        });
        assert.isOk(true);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw Stream Not Specified", async () => {
      try {
        await Streams.update({});
        assert.isOk(false, "didn't throw and error");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.strictEqual(
          error.message,
          "Stream Not Specified",
          "didn't return the right error message"
        );
      }
    });
  });
  describe("Test for Streams.remove()", () => {
    let userStreams = [];
    before(async () => {
      userStreams = await Streams.getUserStreams(user._id);
    });
    it("should remove the stream", async () => {
      try {
        await Streams.remove(userStreams[0]._id);
        assert.isOk(true);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw Invalid ID", async () => {
      try {
        await Streams.remove("notID");
        assert.isOk(false, "didn't throw an error");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.strictEqual(
          error.message,
          "Invalid ID",
          "didn't return the right error message"
        );
      }
    });
  });
});
