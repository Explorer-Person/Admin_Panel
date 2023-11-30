const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Corrected the order of parameters
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // Added the host parameter
    port: process.env.DB_PORT, // Added the port parameter
    dialect: process.env.DB_CLIENT,
  }
);

module.exports = sequelize;
