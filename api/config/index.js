// Load environment variables
require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URL: process.env.MONGO_URL || "",
};
