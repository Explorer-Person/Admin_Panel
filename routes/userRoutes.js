const express = require("express");

const {getAllAdminUser} = require("../controllers/userController/getUser");
const { setUser } = require("../controllers/userController/setUser");
const validateUser = require("../Validators/userValidators/userValidator");

const user = express.Router();


user.post("/setUser", validateUser, setUser);
user.post("/setSuperUser", validateUser,setUser);
user.get("/getAllUser", getAllAdminUser);
user.get("/getAllSuperUser", getAllAdminUser);

module.exports = user;