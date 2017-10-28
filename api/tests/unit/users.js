require("dotenv").config();
const assert = require("chai").assert;
const moment = require("moment");
const { ObjectID } = require("mongodb");
console.log(process.env.DB);
const mongoose = require("mongoose").connect(process.env.DB, {
  useMongoClient: true,
  promiseLibrary: require("bluebird")
});

const User = require("../../models/users");
const Utils = require("../../helpers/utils");

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
        // wait 500ms to make sure update took place
        setTimeout(async () => {
          const updated = await User.getByUsername("test");
          assert.notStrictEqual(
            user.token,
            updated.token,
            "didn't update the token"
          );
        }, 500);
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
        const user = await User.updateUsername("test", update);
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
  it("should return UserNotFound", async () => {
    try {
      const user = await User.getByUsername("notExist");
      assert.isOk(false, "didn't throw error");
    } catch (error) {
      assert.strictEqual(
        error.message,
        "UserNotFound",
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
  it("should return UserNotFound", async () => {
    try {
      const user = await User.getByEmail("notExist");
      assert.isOk(false, "didn't throw error");
    } catch (error) {
      assert.strictEqual(
        error.message,
        "UserNotFound",
        "didn't return right error message"
      );
    }
  });
  describe("Test for User.getByID()", () => {
    it("should return user info", async () => {
      try {
        const beforeUser = await User.getByEmail("test@test.com");
        const user = await User.getByID(beforeUser._id);
        assert.isObject(user, "didn't return an object");
        assert.notExists(user.password, "return password as part of user");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should throw an InvalidID error", async () => {
      try {
        const user = await User.getByID("notExist");
        assert.isOk(false, "didn't throw an error");
      } catch (error) {
        assert.strictEqual(
          error.message,
          "InvalidID",
          "didn't return right error message"
        );
      }
    });
    it("should throw a UserNotFound error", async () => {
      try {
        const user = await User.getByID(
          ObjectID.createFromTime(moment().unix())
        );
        assert.isOk(false, "didn't throw an error");
      } catch (error) {
        assert.strictEqual(
          error.message,
          "UserNotFound",
          "didn't return right error message"
        );
      }
    });
  });
  describe("Test for User.validate()", () => {
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
  describe("Test for User.validateToken()", () => {
    it("should return true", async () => {
      try {
        const { token } = await User.getByEmail("test@test.com");
        let match = await User.validateToken(token);
        assert.isTrue(match, "didn't return true");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
      }
    });
    it("should return false", async () => {
      try {
        let token = await Utils.generateToken("testUpdated");
        let match = await User.validateToken(token);
        assert.isFalse(match, "didn't return false");
      } catch (error) {
        console.log(`Error: ${error.message}`);
        assert.isOk(false, "threw an error");
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
