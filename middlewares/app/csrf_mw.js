const csrf = require('csrf');

const express = require('express');
const sendError = require('../../errors/sendError');
const csrf_mw = express.Router();

const tokens = new csrf();

let storedCsrfToken;

csrf_mw.get('/api/csrf-token', (req,res) => {
    const secret = process.env.CSRF_SECRET;
    storedCsrfToken = tokens.create(secret);
    res
        .status(200)
        .json({
          status: "success",
          msg: "Csrf Token Fetched Successfully...",
          csrfToken: storedCsrfToken,
        });
});

csrf_mw.use((req,res,next)=>{
    const secret = process.env.CSRF_SECRET;
    const actualCsrfToken = req.headers["CSRF-Token"];
    if(!tokens.verify(secret, storedCsrfToken, actualCsrfToken)){
        sendError("Csrf Not Authorized", "fail", 403, next);
    }
    next();
})

module.exports = csrf_mw;