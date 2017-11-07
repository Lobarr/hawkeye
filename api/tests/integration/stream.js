require("dotenv").config();
const chai = require("chai");
const _ = require("underscore");
const assert = chai.assert;
const server = require("../../../index");
chai.use(require("chai-http"));

describe("Test for stream router", () => {
  const userDetails = {
    username: "test",
    password: "password",
    email: "integration@test.com"
  };
  const streamTestCase = {
    name: "testStream",
    url: "rtmp://testUrl",
    location: "testLocation",
    resolution: "720p"
  };
  let userToken;
  let userStreams;
  before(done => {
    // create user
    chai
      .request(server)
      .post("/api/v1/signup")
      .send(userDetails)
      .end();

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
  after(() => {
    chai
      .request(server)
      .del("/api/v1/user/me")
      .set("x-hawkeye-token", userToken)
      .end();
  });
  describe("Test for /api/v1/stream POST", () => {
    it("should should create stream", done => {
      chai
        .request(server)
        .post("/api/v1/stream")
        .send(streamTestCase)
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.exists(res.body.status, "didn't return status in body");
          done();
        });
    });
    it("should return IncompleteRequest", done => {
      chai
        .request(server)
        .post("/api/v1/stream")
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.strictEqual(
              res.status,
              400,
              "didn't return right status code"
            );
            assert.exists(res.body.status, "didn't return status in body");
            assert.strictEqual(
              res.body.status,
              "IncompleteRequest",
              "didn't return right status"
            );
          } else {
            assert.isOk(false, "didn't throw error");
          }
          done();
        });
    });
    it("should return Invalid resolution", done => {
      chai
        .request(server)
        .post("/api/v1/stream")
        .send(Object.assign(streamTestCase, { resolution: "1080" }))
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.strictEqual(
              res.status,
              400,
              "didn't return right status code"
            );
            assert.exists(res.body.status, "didn't return status in body");
            assert.strictEqual(
              res.body.status,
              "Invalid resolution",
              "didn't return right status"
            );
          } else {
            assert.isOk(false, "didn't throw error");
          }
          done();
        });
    });
  });
  describe("Test for /api/v1/streams GET", () => {
    it("should get user's streams", done => {
      chai
        .request(server)
        .get("/api/v1/streams")
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.isArray(res.body);
          assert.isNotEmpty(res.body, "returned empty array");
          userStreams = res.body;
          done();
        });
    });
  });
  describe("Test for /api/v1/stream/:id GET", () => {
    it("should get stream", done => {
      chai
        .request(server)
        .get(`/api/v1/stream/${userStreams[0]._id}`)
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.strictEqual(res.body, userStreams[0], "streams didn't match");
          done();
        });
    });
  });
  describe("Test for /api/v1/stream PATCH", () => {
    it("should update stream", done => {
      chai
        .request(server)
        .patch("/api/v1/stream")
        .send(
          Object.assign({}, _.omit(userStreams[0], "_id"), {
            id: userStreams[0]._id,
            location: "testLocationUpdated"
          })
        )
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.isOk(true);
          done();
        });
    });
  });
  describe("Test for /api/v1/stream/:id DELETE", () => {
    it("should delete stream", done => {
      chai
        .request(server)
        .del(`/api/v1/stream/${userStreams[0]._id}`)
        .set("x-hawkeye-token", userToken)
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }
          assert.exists(res.body.status, "didn't return status in body");
          done();
        });
    });
  });
});
