const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

module.exports = {
  /**
   * Hashes a password
   *
   * @param {string} password - password to be hashed
   * @return {string} hash
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  },

  /**
   * Validates input password with given hash
   *
   * @param {string} input - password that is to be checked against a hash
   * @param {string} hash - hash from the db
   * @returns {boolean} - true if password matches
   */
  async validatePassword(input, hash) {
    return await bcrypt.compare(input, hash);
  },

  /**
   * Generates a token
   *
   * @param {string} username - used to generate username signed token
   * @returns {string} - Token
   */
  async generateToken(username) {
    const payload = { username };

    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
    });
  },
};
