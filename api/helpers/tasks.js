const Users = require("../models/users");
const Streams = require("../models/streams");

module.exports = (agenda) => {
  agenda.define(
    "delete user streams",
    {
      priority: "high",
      concurrency: 100
    },
    async (job, done) => {
      try {
        const { id } = job.attrs.data;
        const userStreams = await Streams.getUserStreams(id);

        userStreams.forEach(async stream => {
          await Streams.remove(stream._id);
        });
        done();
        job.remove();
      } catch (error) {
        job.fail(error);
        job.save();
      }
    }
  );
};
