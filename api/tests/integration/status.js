require("dotenv").config();
const chai = require("chai");
const assert = chai.assert;
const server = require("../../../index");
chai.use(require("chai-http"));

describe("Test for status router", () => {
  it("should return server status", async () => {
    chai
      .request(server)
      .get("/api/v1")
      .end((err, res) => {
        if (err) {
          assert.isOk(false, "threw an error");
        }
        assert.isObject(res.body, "didn't return a body object");
        assert.exists(res.body.status, "response didn't return a status");
        assert.strictEqual(res.status, 200, "didn't return status 200");
        assert.strictEqual(res.body.status, "running", "didn't return running");
      });
  });
});
