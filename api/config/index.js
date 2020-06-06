// Load environment variables
require('dotenv').config();

module.exports.PORT = process.env.PORT || 8080;
module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.MONGO_URL =  process.env.MONGO_URL || '';
