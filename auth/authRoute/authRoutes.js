const express = require("express");
const { loginAdmin, logoutAdmin } = require("../authController/authControllers");
const validateLoginInputs = require("../../Validators/loginValidators/loginValidator");
const auth = express.Router();

auth.post("/login", validateLoginInputs, loginAdmin)
auth.post("/logout", logoutAdmin)

module.exports = auth;
