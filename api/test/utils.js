const assert = require("chai").assert;
const Utils = require("../helpers/utils");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

describe("Test for utils.js", () => {
  describe("Utils.hash()", () => {
    it("should return a hashed password", async () => {
      try {
        const hash = await Utils.hash("test");
        assert.isString(hash, `didn't return a string`);
      } catch (error) {
        assert.isOk(false, "threw an error");
        console.log(error);
      }
    });
  });
  describe("Utils.validatePassword()", () => {
    it("should return true", async () => {
      try {
        const hash = await Utils.hash("test");
        const compare = await Utils.validatePassword("test", hash);
        assert.isTrue(compare, `didn't return true`);
      } catch (error) {
        assert.isOk(false, "threw an error");
        console.log(error);
      }
    });
    it("should return true", async () => {
      try {
        const hash = await Utils.hash("test");
        const compare = await Utils.validatePassword("something", hash);
        assert.isFalse(compare, `didn't return false`);
      } catch (error) {
        assert.isOk(false, "threw an error");
        console.log(error);
      }
    });
  });
  describe("Utils.generateToken", () => {
    it("should return a jwt token", async () => {
      try {
        const token = await Utils.generateToken("test");
        assert.isString(token);
      } catch (error) {
        assert.isOk(false, "threw an error");
        console.log(error);
      }
    });
  });
});
