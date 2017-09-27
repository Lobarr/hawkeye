const assert = require("chai").assert;
const User = require("../models/users");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

describe("Test for User.js", () => {
  describe("User.create()", () => {
    const testCase = {
      username: "test",
      email: "test@test.com",
      password: "test"
    };
    it("should create a user", async () => {
      try {
        await User.create(testCase);
        assert.isOk(true);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw a duplicate username/email error", async () => {
      try {
        await User.create(testCase);
        assert.isOk(false, `didn't throw an error`);
      } catch (error) {
        assert.equal(
          error.message,
          "Duplicate username/email attempted",
          "didn't return the right error message"
        );
      }
    });
  });
  describe("User.updateToken()", () => {
    it("should update user token", async () => {
      try {
        const user = await User.getByUsername("test");
        await User.updateToken("test");
        const updated = await User.getByUsername("test");
        assert.notStrictEqual(
          user.token,
          updated.token,
          "didn't update the token"
        );
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("User.updateUsername()", () => {
    it("should update user's username", async () => {
      try {
        const update = "testUpdated";
        await User.updateUsername("test", update);
        const user = await User.getByUsername("testUpdated");
        assert.strictEqual(
          user.username,
          update,
          "updated username doesn't match"
        );
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  describe("User.getByUsername()", () => {
    it("should return users info", async () => {
      try {
        const user = await User.getByUsername("testUpdated");
        assert.isObject(user, "didn't return an object");
        assert.notExists(user.password, "return password as part of user");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  it("should return NotFound", async () => {
    try {
      const user = await User.getByUsername("notExist");
      assert.isOk(false, "didn't throw error");
    } catch (error) {
      assert.strictEqual(
        error.message,
        "NotFound",
        "didn't return right error message"
      );
    }
  });
  describe("User.getByEmail()", () => {
    it("should return users info", async () => {
      try {
        const user = await User.getByEmail("test@test.com");
        assert.isObject(user, "didn't return an object");
        assert.notExists(user.password, "return password as part of user");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
  it("should return NotFound", async () => {
    try {
      const user = await User.getByEmail("notExist");
      assert.isOk(false, "didn't throw error");
    } catch (error) {
      assert.strictEqual(
        error.message,
        "NotFound",
        "didn't return right error message"
      );
    }
  });
  describe("Test for User.validate", () => {
    it("should return token", async () => {
      try {
        const token = await User.validate("testUpdated", "test");
        assert.isString(token, "didn't return a string");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw Unauthorized", async () => {
      try {
        const token = await User.validate("testUpdated", "notpassword");
        assert.isOk(false, "didn't throw error");
      } catch (error) {
        assert.strictEqual(
          error.message,
          "Unauthorized",
          "didn't return right error message"
        );
      }
    });
    it("should throw InvalidUser", async () => {
      try {
        const token = await User.validate("test", "notpassword");
        assert.isOk(false, "didn't throw error");
      } catch (error) {
        assert.strictEqual(
          error.message,
          "InvalidUser",
          "didn't return right error message"
        );
      }
    });
  });
  describe("Test for User.remove()", () => {
    it("should remove user", async () => {
      try {
        await User.remove("testUpdated");
        assert.isOk(true);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
  });
});
