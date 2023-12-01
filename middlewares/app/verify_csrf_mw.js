const { storedCsrfToken } = require("./csrfManager_mw");
const express = require('express');
const verifyCsrf_mw = express.Router();
const sendError = require('../../errors/sendError');

verifyCsrf_mw.use((req,res,next)=>{
    const csrfTokenStored = storedCsrfToken;
    const secret = process.env.CSRF_SECRET;
    const actualCsrfToken = req.headers["CSRF-Token"];
    if(!tokens.verify(secret, csrfTokenStored, actualCsrfToken)){
        sendError("Csrf Not Authorized", "fail", 403, next);
    }
    next();
});
module.exports = verifyCsrf_mw;
