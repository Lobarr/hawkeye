require("dotenv").config();
const _ = require("underscore");
const chai = require("chai");
const assert = chai.assert;
const server = require("../../../index");
chai.use(require("chai-http"));

describe("Test for user router", () => {
  const userDetails = {
    username: "user",
    password: "password",
    email: "user@test.com"
  };
  let userToken;
  before(() => {
    // create user
    chai
      .request(server)
      .post("/api/v1/signup")
      .send(userDetails)
      .end();
  });
  before(done => {
    // get token
    chai
      .request(server)
      .post("/api/v1/login")
      .send(_.omit(userDetails, "email"))
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  describe("Test for /api/v1/user/me GET", () => {
    it("should get user info", done => {
      chai
        .request(server)
        .get("/api/v1/user/me")
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.exists(res.body._id, "didn't return id in body");
          assert.exists(res.body.username, "didn't return username in body");
          assert.exists(res.body.email, "didn't return email in body");
          assert.notExists(res.body.token, "returned token in body");
          assert.strictEqual(
            res.body.username,
            userDetails.username,
            "usernames didn't match"
          );
          assert.strictEqual(
            res.body.email,
            userDetails.email,
            "emails didn't match"
          );
          done();
        });
    });
  });
  describe("Test for /api/v1/user/me PATCH", () => {
    it("should update username", done => {
      const username = "updatedUserIntegration";
      chai
        .request(server)
        .patch("/api/v1/user/me")
        .send({ username })
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.exists(res.body._id, "didn't return id in body");
          assert.exists(res.body.username, "didn't return username in body");
          assert.exists(res.body.email, "didn't return email in body");
          assert.exists(res.body.token, "didn't return token in body");
          assert.strictEqual(
            res.body.username,
            username,
            "username didn't match"
          );
          userToken = res.body.token;
          done();
        });
    });
  });
  describe("Test for /api/v1/user/me DEL", () => {
    it("should delete user", done => {
      chai
        .request(server)
        .del("/api/v1/user/me")
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          } else {
            assert.exists(res.body.status, "didn't return status in body");
          }
          done();
        });
    });
    it("should return no token passed", done => {
      chai
        .request(server)
        .del("/api/v1/user/me")
        .end((err, res) => {
          if (err) {
            assert.strictEqual(res.status, 401, "didn't return status 401");
            assert.exists(
              res.body.status,
              "didn't return status as part of body"
            );
            assert.strictEqual(
              res.body.status,
              "No token passed",
              "status didn't match"
            );
          } else {
            assert.isOk(false, "didn't return error");
          }
          done();
        });
    });
  });
});
