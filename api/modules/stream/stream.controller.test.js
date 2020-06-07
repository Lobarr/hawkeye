const _ = require("underscore");
const { makeApp } = require("../../setup");
const streamController = require("./stream.controller");
const authController = require("../auth/auth.controller");
const userController = require("../user/user.controller");
const chai = require("chai");
const httpStatus = require("http-status-codes");

chai.use(require("chai-http"));

const assert = chai.assert;
const server = makeApp([authController, streamController, userController]);

describe("streamController", () => {
  const mockUserDetails = {
    username: "stream",
    password: "password",
    email: "test@test.com",
  };

  const mockStream = {
    name: "testStream",
    url: "rtmp://fms.105.net/live/rmc1",
    location: "testLocation",
    resolution: "720p",
  };

  let userToken, userStreams;

  before(async () => {
    await chai.request(server).post("/signup").send(mockUserDetails);

    const res = await chai
      .request(server)
      .post("/login")
      .send(_.omit(mockUserDetails, "email"));

    userToken = res.body.data.token;
  });

  after(async () => {
    await chai
      .request(server)
      .del("/user/me")
      .set("x-hawkeye-token", userToken);
  });

  describe("/stream / POST", () => {
    it("should create stream", async () => {
      const res = await chai
        .request(server)
        .post("/stream")
        .send(mockStream)
        .set("x-hawkeye-token", userToken);

      assert.exists(res.body.status, "didn't return status in body");
    });

    it("should validate payload", async () => {
      try {
        await chai
          .request(server)
          .post("/stream")
          .set("x-hawkeye-token", userToken);

        assert.fail();
      } catch (error) {
        res = error.response;

        assert.strictEqual(
          res.status,
          httpStatus.BAD_REQUEST,
          "didn't return right status code"
        );
        assert.exists(res.body.status, "didn't return status in body");
        assert.strictEqual(
          res.body.status,
          "Incomplete Request",
          "didn't return right status"
        );
      }
    });

    it("should return Invalid resolution", async () => {
      try {
        await chai
          .request(server)
          .post("/stream")
          .send(Object.assign(mockStream, { resolution: "1080" }))
          .set("x-hawkeye-token", userToken);

        assert.fail();
      } catch (error) {
        res = error.response;

        assert.strictEqual(res.status, 400, "didn't return right status code");
        assert.exists(res.body.status, "didn't return status in body");
        assert.strictEqual(
          res.body.status,
          "Invalid resolution",
          "didn't return right status"
        );
      }
    });
  });

  describe("/stream / GET", () => {
    it("should get user's streams", async () => {
      const res = await chai
        .request(server)
        .get("/stream")
        .set("x-hawkeye-token", userToken);

      assert.isArray(res.body.data);
      assert.isNotEmpty(res.body.data, "returned empty array");
      userStreams = res.body.data;
    });
  });

  describe("/stream/:id / GET", () => {
    it("should get stream", async () => {
      const res = await chai
        .request(server)
        .get(`/stream/${userStreams[0]._id}`)
        .set("x-hawkeye-token", userToken);

      assert.deepEqual(res.body.data, userStreams[0], "streams didn't match");
    });
  });

  describe("/stream / PATCH", () => {
    it("should update stream", async () => {
      const res = await chai
        .request(server)
        .patch("/stream")
        .send(
          Object.assign({}, _.omit(userStreams[0], "_id"), {
            id: userStreams[0]._id,
            location: "testLocationUpdated",
          })
        )
        .set("x-hawkeye-token", userToken);

      assert.strictEqual(res.status, httpStatus.OK);
    });
  });

  describe("/stream/:id / DELETE", () => {
    it("should delete stream", async () => {
      const res = await chai
        .request(server)
        .del(`/stream/${userStreams[0]._id}`)
        .set("x-hawkeye-token", userToken);

      assert.exists(res.body.status);
    });
  });
});
