const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const express = require("express");
const session_mw = express.Router();

const optionsUser = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
  expiration: 30 * 60 * 1000,
  schema: {
    tableName: 'user_sessions', 
  }
};

const sessionDBUser = new MySQLStore(optionsUser);

session_mw.use("/",
  session({
    name: "login",
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
    },
    store: sessionDBUser,
  })
);


module.exports = session_mw;
