const { makeApp } = require("../../setup");
const authController = require("./auth.controller");
const chai = require("chai");
const httpStatus = require("http-status-codes");

chai.use(require("chai-http"));

const assert = chai.assert;
const server = makeApp([authController]);

describe("authController", () => {
  const userDetails = {
    username: "auth",
    password: "password",
    email: "auth@test.com",
  };
  let userToken;

  describe("/signup", () => {
    it("should create a user", async () => {
      const res = await chai.request(server).post("/signup").send(userDetails);

      assert.strictEqual(res.status, httpStatus.OK);
      assert.strictEqual(res.body.status, "Success");
    });

    it("should valiate request", async () => {
      try {
        await chai.request(server).post("/signup").send({});

        assert.fail();
      } catch (error) {
        res = error.response;

        assert.strictEqual(res.status, httpStatus.BAD_REQUEST);
        assert.exists(res.body.status);
        assert.strictEqual(res.body.status, "Incomplete Request");
      }
    });
  });

  describe("/login", () => {
    it("should return token", async () => {
      const res = await chai.request(server).post("/login").send({
        username: userDetails.username,
        password: userDetails.password,
      });

      userToken = res.body.data.token;
      assert.strictEqual(res.status, httpStatus.OK);
      assert.exists(res.body.data.token);
    });

    it("should not authorize user", async () => {
      try {
        await chai.request(server).post("/login").send({
          username: userDetails.username,
          password: "some-wrong-password",
        });

        assert.fail();
      } catch (error) {
        res = error.response;

        assert.strictEqual(res.status, httpStatus.UNAUTHORIZED);
        assert.exists(res.body.status, "didn't return status");
      }
    });
  });
});
