const express = require("express");
const { loginAdmin, logoutAdmin } = require("../authController/authControllers");
const auth = express.Router();

auth.post("/login", loginAdmin)
auth.post("/logout", logoutAdmin)

module.exports = auth;
