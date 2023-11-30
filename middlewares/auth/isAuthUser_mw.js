const express = require("express");
const isAuthUser = express();

isAuthUser.use((req,res,next)=>{
    if(!req.session.isAuthUser){
        return res
        .status(403)
        .json({
          status: "error",
          authenticated: false,
          msg: "Please Login With Your Account or Create One",
        });
    }
    
    return next();
})

module.exports = isAuthUser;