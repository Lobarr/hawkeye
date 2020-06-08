const mongoose = require("mongoose");
const { streamModel } = require("./stream.schema");
const { URL } = require("url");

module.exports = {
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
    if (
      name === undefined ||
      url === undefined ||
      location === undefined ||
      resolution === undefined ||
      owner === undefined
    ) {
      throw new Error("Incomplete Parameters");
    }

    if (!url.includes("rtmp://")) {
      throw new Error("Invalid URL");
    }

    const newStream = new streamModel({
      name,
      url,
      location,
      resolution,
      owner,
    });

    await newStream.save();
  },

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
    const { id } = payload;

    if (!id) {
      throw new Error("Stream Not Specified");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const keys = ["name", "url", "location", "resolution"]; // updatable fields
    let updatedFields = {};

    keys.forEach((key) => {
      if (payload[key] !== undefined || payload[key] !== null) {
        updatedFields[key] = payload[key];
      }
    });

    await streamModel.findByIdAndUpdate(id, updatedFields);
  },

  /**
   * Gets a stream by id
   *
   * @param {*} id
   */
  async getStream(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const stream = await streamModel.findById(id);

    return stream.toObject();
  },

  /**
   * Gets all streams for a user
   *
   * @param {string} id - id of user to get streams
   * @returns {array} - array of user streams
   * @throws {string}
   */
  async getUserStreams(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const streams = await streamModel.find(
      { owner: id },
      { name: 1, url: 1, location: 1, resolution: 1 }
    );

    return streams;
  },

  /**
   * Returns how many streams a user has
   *
   * @param {*} id
   */
  async getUserStreamsCount(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    return await streamModel.countDocuments({ owner: id });
  },

  /**
   * Removes a stream
   *
   * @param {any} id
   * @throws {string}
   */
  async remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    await streamModel.findByIdAndRemove(id);
  },
};
