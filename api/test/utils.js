require("dotenv").config();
const assert = require("chai").assert;

const Utils = require("../helpers/utils");

describe("Test for utils.js", () => {
  describe("Utils.hash()", () => {
    it("should return a hashed password", async () => {
      try {
        const hash = await Utils.hash("test");
        assert.isString(hash, `didn't return a string`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
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
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should return true", async () => {
      try {
        const hash = await Utils.hash("test");
        const compare = await Utils.validatePassword("something", hash);
        assert.isFalse(compare, `didn't return false`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("Utils.generateToken()", () => {
    it("should return a jwt token", async () => {
      try {
        const token = await Utils.generateToken("test");
        assert.isString(token);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
});
