require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const Utils = {
  /**
   * Hashes an input
   *
   * @param {string} password - password to be hashed
   * @return {string} hash
   */
  async hash(password) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  /**
   * Used to validate if hash matches input
   *
   * @param {string} input - password that is to be checked against a hash
   * @param {string} hash - hash from the db
   * @returns {boolean} - true if password matches
   */
  async validatePassword(input, hash) {
    const match = await bcrypt.compare(input, hash);
    return match;
  },

  /**
   * Generates a token
   *
   * @param {string} username - used to generate username signed token
   * @returns {string} - Token
   */
  async generateToken(username) {
    const payload = { username };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256"
    });
  }
};

module.exports = Utils;
