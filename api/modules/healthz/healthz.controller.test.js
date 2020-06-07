const { makeApp } = require("../../setup");
const healthzController = require("./healthz.controller");
const chai = require("chai");

chai.use(require("chai-http"));

const assert = chai.assert;
const server = makeApp([healthzController]);

describe("healthzController", () => {
  describe("/healthz", () => {
    it("should return server status", async () => {
      try {
        const res = await chai.request(server).get("/healthz");

        assert.isObject(res.body, "didn't return a body object");
        assert.exists(res.body.status, "response didn't return a status");
        assert.strictEqual(res.status, 200, "didn't return status 200");
        assert.strictEqual(res.body.status, "running", "didn't return running");
      } catch (error) {
        assert.fail(error.message);
      }
    });
  });
});
