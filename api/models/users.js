const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
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
   * @throws {string} - Duplicate username/email attempted
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
   * @param {string} oldUsername - current username to update
   * @param {string} newUsername - used to update a user's username
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
   * @throws {string} - NotFound
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
   * @param {string} ID ObjectId of user to find
   * @returns {object} - user info
   * @throws {string} - NotFound
   */

  async getByID(ID) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      const user = await UserModel.findById(ID, {
        username: 1,
        email: 1,
        token: 1
      });
      if (user) {
        return user;
      } else {
        throw new Error("NotFound");
      }
    } else {
      throw new Error("InvalidID");
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
   * @param {string} token - user assigned jwt token
   * @returns {boolean} - true if token matches with verified user
   */
  async validateToken(token) {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.getByUsername(username);
    return user && user.token === token ? true : false;
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
