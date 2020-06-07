// require("dotenv").config();
// const _ = require("underscore");
// const chai = require("chai");
// const assert = chai.assert;
// const server = require("../../../index");
// chai.use(require("chai-http"));

const _ = require("underscore");
const { makeApp } = require("../../setup");
const authController = require("../auth/auth.controller");
const userController = require("../user/user.controller");
const chai = require("chai");
const httpStatus = require("http-status-codes");

chai.use(require("chai-http"));

const assert = chai.assert;
const server = makeApp([authController, userController]);

describe("userController", () => {
  const userDetails = {
    username: "user",
    password: "password",
    email: "user@test.com",
  };
  let userToken;

  before(async () => {
    await chai.request(server).post("/signup").send(userDetails);
    const res = await chai
      .request(server)
      .post("/login")
      .send(_.omit(userDetails, "email"));

    userToken = res.body.data.token;
  });

  describe("/user/me / GET", () => {
    it("should get user info", async () => {
      const res = await chai
        .request(server)
        .get("/user/me")
        .set("x-hawkeye-token", userToken);

      data = res.body.data;

      assert.exists(data._id, "didn't return id in body");
      assert.exists(data.username, "didn't return username in body");
      assert.exists(data.email, "didn't return email in body");
      assert.notExists(data.token, "returned token in body");
      assert.strictEqual(data.username, userDetails.username);
      assert.strictEqual(data.email, userDetails.email);
    });
  });
  describe("/user/me / PATCH", () => {
    it("should update username", async () => {
      const username = "someUsername";

      const res = await chai
        .request(server)
        .patch("/user/me")
        .send({ username })
        .set("x-hawkeye-token", userToken);

      data = res.body.data;

      assert.exists(data._id, "didn't return id in body");
      assert.exists(data.username, "didn't return username in body");
      assert.exists(data.email, "didn't return email in body");
      assert.exists(data.token, "didn't return token in body");
      assert.strictEqual(data.username, username);
      userToken = data.token;
    });
  });
  describe("/user/me / DEL", () => {
    it("should delete user", async () => {
      const res = await chai
        .request(server)
        .del("/user/me")
        .set("x-hawkeye-token", userToken);

      assert.exists(res.body.status, "didn't return status in body");
    });

    it("should return no token passed", async () => {
      try {
        await chai.request(server).del("/user/me");

        assert.fail();
      } catch (error) {
        res = error.response;

        assert.strictEqual(res.status, 401, "didn't return status 401");
        assert.exists(res.body.status);
        assert.strictEqual(res.body.status, "No token provided");
      }
    });
  });
});
