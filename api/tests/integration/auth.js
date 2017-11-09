require("dotenv").config();
const chai = require("chai");
const assert = chai.assert;
const server = require("../../../index");
chai.use(require("chai-http"));

describe("Test for auth router", () => {
  const userDetails = {
    username: "auth",
    password: "password",
    email: "auth@test.com"
  };
  let userToken;
  after(() => {
    chai
      .request(server)
      .del("/api/v1/user/me")
      .set("x-hawkeye-token", userToken)
      .end();
  });
  describe("Test for /api/v1/signup", () => {
    it("should create a user", done => {
      chai
        .request(server)
        .post("/api/v1/signup")
        .send(userDetails)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.strictEqual(res.status, 200, "didn't return status 200");
          assert.strictEqual(
            res.body.status,
            "Success",
            "didn't return right status"
          );
          done();
        });
    });
    it("should return IncompleteRequest", done => {
      chai
        .request(server)
        .post("/api/v1/signup")
        .send({})
        .end((err, res) => {
          if (err) {
            assert.strictEqual(res.status, 400, "didn't return status 400");
            assert.exists(res.body.status, "didn't return a status");
            assert.strictEqual(
              res.body.status,
              "IncompleteRequest",
              "didn't return right status"
            );
          } else {
            assert.isOk(false, "didn't throw an error");
          }
          done();
        });
    });
  });
  describe("Test for /api/v1/login", () => {
    it("should return token", done => {
      chai
        .request(server)
        .post("/api/v1/login")
        .send({
          username: userDetails.username,
          password: userDetails.password
        })
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          userToken = res.body.token;
          assert.strictEqual(res.status, 200, "didn't return status 200");
          assert.exists(res.body.token, "didn't return token");
          done();
        });
    });
    it("should return 401", done => {
      chai
        .request(server)
        .post("/api/v1/login")
        .send({
          username: userDetails.username,
          password: "wrong password"
        })
        .end((err, res) => {
          if (err) {
            assert.strictEqual(res.status, 401, "didn't return status 401");
            assert.exists(res.body.status, "didn't return status");
          } else {
            assert.isOk(false, "didn't throw an error");
          }
          done();
        });
    });
  });
});
