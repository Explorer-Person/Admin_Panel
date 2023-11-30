const SuperUserQueries = require("../../db/queries/userQueries/superUserQueries");
const UserQueries = require("../../db/queries/userQueries/userQueries");
const sendError = require("../../errors/sendError");

exports.getAllAdminUser = async (req, res, next) => {
  const userType = req.headers["user-type"];
  const choosedQuery = await userType === "Super_User" ? SuperUserQueries.getAllUser() : UserQueries.getAllUser();
  choosedQuery
    .then((users) => {
      if (!users) {
        return sendError("Users Not Found", "fail", 404, next);
      }
      res.status(200).json({
        status: "success",
        msg: `Users Brought Successfully`,
        content: users,
    });
    })
    .catch((err) => {
      return sendError("Something Went Wrong - User Couldn't Fetched", "fail", 500, next);
    });
};
