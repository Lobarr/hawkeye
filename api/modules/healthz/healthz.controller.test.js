const makeApp = require("../../setup/appFactory");
const chai = require("chai");
const makeAgent = require("../../testUtils/agentFactory");

chai.use(require("chai-http"));

const assert = chai.assert;

describe("healthzController", () => {
  const agent = makeAgent();

  describe("/healthz", () => {
    it("should return server status", async () => {
      try {
        const res = await agent.get("/healthz");

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
