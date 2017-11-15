const mongoose = require("mongoose");
const Agenda = require("agenda");
const agenda = new Agenda({
  db: {
    address: process.env.DB
  },
  processEvery: "1 minute"
});

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
   * @throws {string}
   */
  async create(payload) {
    const { name, url, location, resolution, owner } = payload;
    if (name && url && location && resolution && owner) {
      if (url.includes("rtmp://")) {
        const newStream = StreamsModel({
          name,
          url,
          location,
          resolution,
          owner
        });
        await newStream.save();
      } else {
        throw new Error("Invalid URL");
      }
    } else {
      throw new Error("Incomplete Parameters");
    }
  },
  //! Make everything show from the front end when updating
  /**
   * Updates a stream
   * 
   * @param {object} payload 
   * @param {string} payload.id - id of stream to be updated
   * @param {string} payload.name - name of stream
   * @param {string} payload.url - rtsp/rtmp link
   * @param {string} payload.location - location of the stream
   * @param {string} payload.resolution - resolution of the stream
   * @throws {string} - Stream Not Specified
   */
  async update(payload) {
    if (!payload.id) {
      throw new Error("Stream Not Specified");
    }
    if (mongoose.Types.ObjectId.isValid(payload.id)) {
      const keys = ["name", "url", "location", "resolution"];
      let params = {};
      keys.forEach(key => {
        if (payload[key] !== undefined) {
          params[key] = payload[key];
        }
      });
      await StreamsModel.findByIdAndUpdate(payload.id, params);
    } else {
      throw new Error("Invalid ID");
    }
  },
  async getStream(ID) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      const stream = await StreamsModel.findById(ID);
      return stream;
    } else {
      throw new Error("Invalid ID");
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
      return streams;
    } else {
      throw new Error("Invalid ID");
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
      throw new Error("Invalid ID");
    }
  }
};

module.exports = Stream;
