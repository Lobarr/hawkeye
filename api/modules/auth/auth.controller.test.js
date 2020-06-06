const { makeApp } = require("../../setup");
const authController = require("./auth.controller");
const chai = require("chai");

chai.use(require("chai-http"));

const assert = chai.assert;
const server = makeApp([authController]);

describe("Test for auth router", () => {
  const userDetails = {
    username: "auth",
    password: "password",
    email: "auth@test.com",
  };
  let userToken;

  describe("/signup", () => {
    it("should create a user", async () => {
      const res = await chai
        .request(server)
        .post("/v1/signup")
        .send(userDetails);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, "Success");
    });

    it("should return Incomplete Request", async () => {
      // chai
      //   .request(server)
      //   .post("/v1/signup")
      //   .send({})
      //   .end((err, res) => {
      //     if (err) {
      //       assert.strictEqual(res.status, 400, "didn't return status 400");
      //       assert.exists(res.body.status, "didn't return a status");
      //       assert.strictEqual(
      //         res.body.status,
      //         "Incomplete Request",
      //         "didn't return right status"
      //       );
      //     } else {
      //       assert.isOk(false, "didn't throw an error");
      //     }
      //     done();
      //   });
      let res;

      try {
        await chai.request(server).post("/v1/signup").send({});

        assert.fail();
      } catch (res) {
        console.log(res.status, res.body);
        assert.strictEqual(res.status, 400, "didn't return status 400");
        assert.exists(res.body.status, "didn't return a status");
        assert.strictEqual(
          res.body.status,
          "Incomplete Request",
          "didn't return right status"
        );
      }
    });
  });

  describe("/login", () => {
    it("should return token", (done) => {
      chai
        .request(server)
        .post("/v1/login")
        .send({
          username: userDetails.username,
          password: userDetails.password,
        })
        .end((err, res) => {
          if (err) {
            assert.isOk(
              false,
              `Error: ${err.message} | Status: ${res.body.status}`
            );
          }

          userToken = res.body.data.token;
          assert.strictEqual(res.status, 200, "didn't return status 200");
          assert.exists(res.body.data.token, "didn't return token");
          done();
        });
    });

    it("should return 401", (done) => {
      chai
        .request(server)
        .post("/v1/login")
        .send({
          username: userDetails.username,
          password: "some-wrong-password",
        })
        .end((err, res) => {
          if (err) {
            assert.strictEqual(res.status, 401, "didn't return status 401");
            assert.exists(res.body.status, "didn't return status");
          } else {
            assert.isOk(false);
          }
          done();
        });
    });
  });
});
