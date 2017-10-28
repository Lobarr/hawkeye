require("dotenv").config();
const chai = require("chai");
const assert = chai.assert;
const Users = require("../../models/users");
const server = require("../../../index");
chai.use(require("chai-http"));

describe("Test for auth router", () => {
  const userDetails = {
    username: "test",
    password: "password",
    email: "integration@test.com"
  };
  after(async () => {
    await Users.remove(userDetails.username);
  });
  describe("Test for /api/v1/signup", () => {
    it("should create a user", async () => {
      chai
        .request(server)
        .post("/api/v1/signup")
        .send(userDetails)
        .end((err, res) => {
          if (err) {
            assert.isOk(false, "threw an error");
          }
          assert.strictEqual(res.status, 200, "didn't return status 200");
          assert.strictEqual(
            res.body.status,
            "success",
            "didn't return right status"
          );
        });
    });
    it("should return IncompleteRequest", async () => {
      chai
        .request(server)
        .post("/api/v1/signup")
        .send({})
        .end((err, res) => {
          if (err) {
            assert.isOk(false, "threw an error");
          }
          assert.strictEqual(res.status, 400, "didn't return status 400");
          assert.strictEqual(
            res.body.status,
            "IncompleteRequest",
            "didn't return right status"
          );
        });
    });
  });
  describe("Test for /api/v1/login", () => {
    it("should return token", async () => {
      chai
        .request(server)
        .post("/api/v1/login")
        .send({
          username: userDetails.username,
          password: userDetails.password
        })
        .end((err, res) => {
          if (err) {
            assert.isOk(false, "threw an error");
          }
          assert.strictEqual(res.status, 200, "didn't return status 200");
          assert.exists(res.body.token, "didn't return token");
        });
    });
  });
});
