const express = require("express");
const auth_mw = express();

auth_mw.use("/admin/authorize", (req, res, next) => {
  const isAuthUser = req.session.isAuthUser;
  const rootAccess = req.session.rootAccess;
  if (!isAuthUser) {
    return res.status(403).json({
      status: "fail",
      authenticated: false,
      rootAccess: false,
      msg: "Please Login With Your Account or Create One",
    });
  }
  
  res.status(202).json({
    status: "success",
    authenticated: true,
    rootAccess: rootAccess,
    msg: "Successfully Logged In...",
  });

});

module.exports = auth_mw;
