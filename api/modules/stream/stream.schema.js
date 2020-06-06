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
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const streamModel = mongoose.model("stream", streamSchema);

module.exports = {
  streamSchema,
  streamModel
}
