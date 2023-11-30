const fs = require("fs");
require('dotenv').config(); // Load environment variables from .env file

const sslBundle_stg = fs.readFileSync('../ssl/sslBundle_stg.pem');
const sslBundle_prd = fs.readFileSync('../ssl/sslBundle_prd.pem');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CLIENT,
    migrationStorageTableName: "migrations",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CLIENT,
    migrationStorageTableName: "migrations",
    ssl: {
      ca: sslBundle_stg,
      rejectUnauthorized: true,
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CLIENT,
    migrationStorageTableName: "migrations-prd",
    ssl: {
      ca: sslBundle_prd,
      rejectUnauthorized: true,
    }
  }
};
