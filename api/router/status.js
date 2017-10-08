const status = require("express").Router();

/**
 * @api {get} /api/v1 Request Status of the server
 * @apiName GetStatus
 * @apiGroup Status
 * @apiVersion 0.0.1
 * @apiSuccess {String} status Status of the server
 * @apiSuccessExample Example data on success:
 * {
 *  status: "running"
 * }
 */
status.get("/api/v1", (req, res) => {
  res.send({
    status: "running"
  });
});

module.exports = status;
