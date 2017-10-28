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
   * Updates a user's username
   * @param {string} oldUsername - current username to update
   * @param {string} newUsername - used to update a user's username
   */
  async updateUsername(oldUsername, newUsername) {
    await UserModel.findOneAndUpdate(
      { username: oldUsername },
      { username: newUsername }
    );
    await User.updateToken(newUsername);
    return User.getByUsername(newUsername);
  },

  /**
   * Updates a user's token 
   * 
   * @param {string} username - username of user to be updated
   */
  async updateToken(username) {
    const newToken = await Utils.generateToken(username);
    await UserModel.findOneAndUpdate({ username }, { token: newToken });
    return newToken;
  },

  /**
   * Gets a user by username
   * 
   * @param {string} username
   * @returns {object} - user info
   * @throws {string} - UserNotFound
   */
  async getByUsername(username) {
    const user = await UserModel.findOne(
      { username },
      { username: 1, email: 1, token: 1 }
    );
    if (user) {
      return user;
    } else {
      throw new Error("UserNotFound");
    }
  },

  /**
   * Gets a user by ID
   * 
   * @param {string} ID ObjectId of user to find
   * @returns {object} - user info
   * @throws {string} - UserNotFound
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
        throw new Error("UserNotFound");
      }
    } else {
      throw new Error("InvalidID");
    }
  },
  /**
   * Gets a user by email
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
      throw new Error("UserNotFound");
    }
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
    const user = await UserModel.findOne({ username });
    if (user) {
      const match = await Utils.validatePassword(password, user.password);
      if (match) {
        const token = await User.updateToken(user.username);
        return token;
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
    console.log(username);
    const user = await User.getByUsername(username);
    return user && user.token === token ? true : false;
  },
  /**
   * Removes a user
   * 
   * @param {string} username - user to be removed
   */
  async remove(username) {
    await UserModel.findOneAndRemove({ username });
  }
};

module.exports = User;
