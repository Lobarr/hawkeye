const router = require("express").Router();

/**
 * @api {get} /healthz Request Status of the server
 * @apiName GetStatus
 * @apiGroup Status
 * @apiVersion 0.0.1
 * @apiSuccess {String} status Status of the server
 * @apiSuccessExample Example data on success:
 * {
 *  status: "running"
 * }
 */
router.get("/healthz", (_, res) => {
  res.send({
    status: "running"
  });
});

module.exports = router;
