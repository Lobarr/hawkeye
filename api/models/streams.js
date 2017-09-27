const mongoose = require("mongoose");

const streamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  resolution: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const StreamsModel = mongoose.model("stream", streamSchema);

const Stream = {
  async create() {}
};

module.exports = Stream;
