const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Utils = {
  /**
   * 
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
   * 
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
   * 
   * 
   * @param {string} username - used to generate username signed token 
   * @returns {string} - Token
   */
  async generateToken(username) {
    const payload = {
      username
    };
    return jwt.sign(payload, "HawkeyeSees", {
      algorithm: "HS256"
    });
  }
};

module.exports = Utils;
