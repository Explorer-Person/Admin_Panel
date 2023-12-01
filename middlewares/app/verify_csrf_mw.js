const sendError = require('../../errors/sendError');
const { verifyCsrfToken } = require('./csrfManager_mw');
const express = require('express');
const verifyCsrf_mw = express.Router();


verifyCsrf_mw.use((req,res,next)=>{
    const actualCsrfToken = req.headers["CSRF-Token"];
    const isVerified = verifyCsrfToken(actualCsrfToken);
    if(!isVerified){
        sendError("Csrf Not Authorized", "fail", 403, next);
    }
    next();
});
module.exports = verifyCsrf_mw;
