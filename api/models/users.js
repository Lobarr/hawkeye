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
	 */
  async create(payload) {
    const { username, email, password } = payload;
  }
};

module.exports = User;
