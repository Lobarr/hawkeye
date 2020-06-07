const { JWT_SECRET } = require("../../config");
const { userModel } = require("./user.schema");
const authService = require("../auth/auth.service");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  /**
   * Creates a user
   *
   * @param {object} payload
   * @param {string} payload.username - The username of the the user
   * @param {string} payload.email - The email of the user
   * @param {string} payload.password - The password to be written to the db
   * @throws {string} - Duplicate username/email attempted
   */
  async create(payload) {
    try {
      const { username, email, password } = payload;
      const hash = await authService.hashPassword(password);
      const token = await authService.generateToken(username);

      const newUser = userModel({
        username,
        email,
        password: hash,
        token,
      });

      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new Error("Duplicate username/email attempted"); // custom error message
    }
  },

  /**
   * Updates a user's username
   * @param {string} oldUsername - current username to update
   * @param {string} newUsername - used to update a user's username
   */
  async updateUsername(oldUsername, newUsername) {
    await userModel.findOneAndUpdate(
      { username: oldUsername },
      { username: newUsername }
    );

    await this.updateToken(newUsername);

    return this.getByUsername(newUsername);
  },

  /**
   * Updates a user's token
   *
   * @param {string} username - username of user to be updated
   */
  async updateToken(username) {
    const newToken = await authService.generateToken(username);

    await userModel.findOneAndUpdate({ username }, { token: newToken });

    return newToken;
  },

  /**
   * Gets a user by username
   *
   * @param {string} username
   * @returns {object} - user info
   * @throws {string} - User Not Found
   */
  async getByUsername(username) {
    const user = await userModel.findOne(
      { username },
      { username: 1, email: 1, token: 1 }
    );

    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  },

  /**
   * Gets a user by ID
   *
   * @param {string} ID ObjectId of user to find
   * @returns {object} - user info
   * @throws {string} - User Not Found
   */

  async getByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const user = await userModel.findById(id, {
      username: 1,
      email: 1,
      token: 1,
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    return user.toObject();
  },

  /**
   * Gets a user by email
   *
   * @param {string} email
   * @returns {object} = user info
   * @throws {string}
   */
  async getByEmail(email) {
    const user = await userModel.findOne(
      { email },
      { username: 1, email: 1, token: 1 }
    );

    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  },

  /**
   * validates the input username and password matches that of a user
   * then updates the user's token so only one session can be made by a user
   * at any time
   *
   * @param {string} username
   * @param {string} password
   * @returns {string} - token
   * @throws {string} - Invalid user / Unauthorized
   */
  async validate(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("Invalid User");
    }

    const match = await authService.validatePassword(password, user.password);
    if (!match) {
      throw new Error("Unauthorized");
    }

    const token = await this.updateToken(user.username);
    return token;
  },

  /**
   *
   *
   * @param {string} token - user assigned jwt token
   * @returns {boolean} - true if token matches with verified user
   */
  async validateToken(token) {
    const { username } = jwt.verify(token, JWT_SECRET);
    const user = await this.getByUsername(username);

    return user && user.token === token ? true : false;
  },

  /**
   * Removes a user
   *
   * @param {string} username - user to be removed
   */
  async remove(username) {
    await userModel.findOneAndRemove({ username });
  },
};
