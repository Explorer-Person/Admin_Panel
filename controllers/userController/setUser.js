const { validationResult } = require("express-validator");
const SuperUserQueries = require("../../db/queries/userQueries/superUserQueries");
const UserQueries = require("../../db/queries/userQueries/userQueries");
const sendError = require("../../errors/sendError");
const bcrypt = require("bcryptjs");

exports.setUser = async (req, res, next) => {
  const users = await req.body;
  const userType = req.headers["user-type"];
  const isSuperUserEmpty = await SuperUserQueries.getAllUser();
  const isUserEmpty = await UserQueries.getAllUser();
  const isEmpty =
    (await userType) === "Super_User"
      ? isSuperUserEmpty
      : isUserEmpty

  const userData = users.map((user) => {
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    return {
      user_id: user.user_id,
      username: user.username,
      password: hashedPassword,
      email: user.email,
      created_at: Date.now(),
    };
  });
  const userIds = users.map((user) => user.user_id);
  const cols =
    isEmpty === false
      ? []
      : ["user_id", "username", "password", "email", "created_at"];

  const userQueries =
    await userType === "Super_User"
      ? new SuperUserQueries(userData, userIds, cols)
      : new UserQueries(userData, userIds, cols);
      
  const choosedQuery =
    isEmpty === false ? userQueries.createTable() : userQueries.updateUser();

  await choosedQuery
    .then((result) => {
      if (!result || result === false) {
        return sendError("User Cant Created", "fail", 500, next);
      }
      const validationErrors = validationResult(req);
      if(validationErrors.array().length > 0){
        return res.status(400).json({ errors: validationErrors.array() });
      }
      res.status(201).json({
        status: "success",
        msg: "User Configured Successfully",
      });
    })
    .catch((err) => {

      return sendError("Something Went Wrong - User Couldn't Edited", "fail", 500, next);
    });
};
