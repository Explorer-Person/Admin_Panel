const SuperUserQueries = require("../../db/queries/userQueries/superUserQueries");
const UserQueries = require("../../db/queries/userQueries/userQueries");
const sendError = require("../../errors/sendError");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.loginAdmin = async (req, res, next) => {
  const { username, password } = await req.body;
  const superUser = await SuperUserQueries.getUser(username);

  const validationErrors = validationResult(req);
  if (validationErrors.array().length > 0) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  UserQueries.getUser(username)
    .then((user) => {
      if (!user && !superUser) {
        return sendError("Username Not Correct", "fail", 401, next);
      }
      const correctPassword =
        superUser && !user
          ? superUser.dataValues.password
          : user.dataValues.password;
      bcrypt
        .compare(password, correctPassword)
        .then((isCorrect) => {
          if (!isCorrect) {
            return sendError("Password Not Correct", "fail", 401, next);
          }
          req.session.isAuthUser = true;
          req.session.rootAccess = superUser && !user ? true : false;
          req.session.user =
            superUser && !user
              ? superUser.dataValues.username
              : user.dataValues.username;
          return req.session.save(async (result) => {
            try {
              res.status(202).json({
                status: "success",
                authenticated: true,
                msg: "User Authorized Successfully",
              });
            } catch (err) {
              return sendError(
                "Something Went Wrong With Sessions...",
                "fail",
                500,
                next
              );
            }
          });
        })
        .catch((err) => {
          return sendError(err, "fail", 500, next);
        });
    })
    .catch((err) => {
      return sendError(err, "fail", 500, next);
    });
};

exports.logoutAdmin = (req, res, next) => {
  if (req.session.isAuthUser === true) {
    return req.session.destroy(() => {
      try {
        res.status(200).json({
          status: "success",
          authenticated: true,
          msg: "Logged Out Successfully",
        });
      } catch (err) {
        return sendError(err, "fail", 500, next);
      }
    });
  }
  return res.status(200).json({
    status: "fail",
    authenticated: false,
    msg: "Can not Logged Out...",
  });
};
