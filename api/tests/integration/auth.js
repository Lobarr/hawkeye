require("dotenv").config();
const http = require("http");
const chai = require("chai");
const assert = chai.assert;
const app = require("../../../index");
chai.use(require("chai-http"));

describe("Test for auth router", () => {
  const server = http.createServer(app);
  const userDetails = {
    username: "test",
    password: "password",
    email: "integration@test.com"
  };
  after(async () => {
    await server.close();
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
    it("should return 401", async () => {
      chai
        .request(server)
        .post("/api/v1/login")
        .send({
          username: userDetails.username,
          password: "wrong password"
        })
        .end((err, res) => {
          if (err) {
            assert.isOk(false, "threw an error");
          }
          assert.strictEqual(res.status, 401, "didn't return status 401");
          assert.exists(res.body.status, "didn't return status");
        });
    });
  });
});
