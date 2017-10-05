const assert = require("chai").assert;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

const Streams = require("../models/streams");
const Users = require("../models/users");

describe("Test for Stream.js", () => {
  describe("Streams.create()", () => {
    it("should create a stream", () => {
      Users.create();
    });
  });
});
