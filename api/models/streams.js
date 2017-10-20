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

const StreamsModel = mongoose.model("stream", streamSchema);

//! Logic is kept here
const Stream = {
  /**
   * Creates a stream for a user
   * 
   * @param {object} payload 
   * @param {string} payload.name - name of stream
   * @param {string} payload.url - rtsp/rtmp link
   * @param {string} payload.location - location of the stream
   * @param {string} payload.resolution - resolution of the stream
   * @param {string} payload.owner - object id of the owner of the stream
   * @throws {string} - IncompleteParameters
   */
  async create(payload) {
    try {
      const { name, url, location, resolution, owner } = payload;
      const newStream = StreamsModel({
        name,
        url,
        location,
        resolution,
        owner
      });
      await newStream.save();
    } catch (error) {
      throw new Error("IncompleteParameters");
    }
  },
  //! Make everything show from the front end when updating
  /**
   * Updates a stream
   * 
   * @param {object} payload 
   * @param {string} payload.stream - stream to be updated
   * @param {string} payload.name - name of stream
   * @param {string} payload.url - rtsp/rtmp link
   * @param {string} payload.location - location of the stream
   * @param {string} payload.resolution - resolution of the stream
   * @throws {string} - StreamNotSpecified
   */
  async update(payload) {
    if (!payload.stream) {
      throw new Error("StreamNotSpecified");
    }
    if (mongoose.Types.ObjectId.isValid(payload.stream)) {
      const keys = ["name", "url", "location", "resolution"];
      let params = {};
      keys.forEach(key => {
        if (payload[key] !== undefined) {
          params[key] = payload[key];
        }
      });
      await StreamsModel.findByIdAndUpdate(payload.stream, params);
    } else {
      throw new Error("InvalidID");
    }
  },
  async getStream(ID) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      const stream = await StreamsModel.findById(ID);
      return stream;
    } else {
      throw new Error("InvalidID");
    }
  },

  /**
   * Gets all streams for a user 
   * 
   * @param {string} ID - id of user to get streams
   * @returns {array} - array of user streams
   * @throws {string}
   */
  async getUserStreams(ID) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      const streams = await StreamsModel.find(
        { owner: ID },
        { name: 1, url: 1, location: 1, resolution: 1 }
      );
      if (streams.length !== 0) {
        return streams;
      } else {
        throw new Error("NoStreams");
      }
    } else {
      throw new Error("InvalidID");
    }
  },

  /**
   * Removes a stream
   * 
   * @param {any} ID 
   * @throws {string} 
   */
  async remove(ID) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      await StreamsModel.findByIdAndRemove(ID);
    } else {
      throw new Error("InvalidID");
    }
  }
};

module.exports = Stream;
