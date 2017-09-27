const mongoose = require("mongoose");
const Utils = require("../helpers/utils");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

const UserModel = mongoose.model("user", userSchema);

//! Logic is kept here
const User = {
  /**
	 * 
	 * 
	 * @param {object} payload 
	 * @param {string} payload.username - The username of the the user
	 * @param {string} payload.email - The email of the user 
	 * @param {string} payload.password - The password to be written to the db
   * @throws {string}
   */
  async create(payload) {
    try {
      const { username, email, password } = payload;
      const hashed = await Utils.hash(password);
      const token = await Utils.generateToken(username);

      const newUser = UserModel({
        username,
        email,
        password: hashed,
        token
      });
      await newUser.save();
    } catch (error) {
      throw new Error("Duplicate username/email attempted"); // custom error message
    }
  },

  /**
   * 
   * 
   * @param {string} username - used to update a user's username
   */
  async updateUsername(oldUsername, newUsername) {
    await UserModel.findOneAndUpdate(
      { username: oldUsername },
      { username: newUsername }
    );
  },

  /**
   * 
   * 
   * @param {string} username - username of user to be updated
   */
  async updateToken(username) {
    const newToken = await Utils.generateToken(username);
    await UserModel.findOneAndUpdate({ username }, { token: newToken });
  },

  /**
   * 
   * 
   * @param {string} username
   * @returns {object} - user info
   * @throws {string}
   */
  async getByUsername(username) {
    const user = await UserModel.findOne(
      { username },
      { username: 1, email: 1, token: 1 }
    );
    if (user) {
      return user;
    } else {
      throw new Error("NotFound");
    }
  },

  /**
   * 
   * 
   * @param {string} email 
   * @returns {object} = user info
   * @throws {string}
   */
  async getByEmail(email) {
    const user = await UserModel.findOne(
      { email },
      { username: 1, email: 1, token: 1 }
    );
    if (user) {
      return user;
    } else {
      throw new Error("NotFound");
    }
  },

  /**
   * 
   * 
   * @param {string} username 
   * @param {string} password 
   * @returns {string} - token
   * @throws {string} - Invalid user / Unauthorized 
   */
  async validate(username, password) {
    const user = await UserModel.findOne({ username });
    if (user) {
      const match = await Utils.validatePassword(password, user.password);
      if (match) {
        return user.token;
      } else {
        throw new Error("Unauthorized");
      }
    } else {
      throw new Error("InvalidUser");
    }
  },

  /**
   * 
   * 
   * @param {string} username - user to be removed
   */
  async remove(username) {
    await UserModel.findOneAndRemove({ username });
  }
};

module.exports = User;
