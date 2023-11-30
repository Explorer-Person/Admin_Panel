const express = require("express");
const isAuthSuperUser = express();

isAuthSuperUser.use((req,res,next) =>{
    if(!req.session.rootAccess){
        return res
        .status(403)
        .json({
          status: "fail",
          rootAccess: false,
          msg: "You have not root access there.",
        });
    }
    
    return next();
});

module.exports = isAuthSuperUser;