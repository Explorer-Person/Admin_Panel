const express = require('express');
const { generateNewToken } = require('./csrfManager_mw');
const generateCsrf_mw = express.Router();

generateCsrf_mw.get('/api/csrf-token', (req,res)=>{
    const storedCsrfToken = generateNewToken();
    res
        .status(200)
        .json({
          status: "success",
          msg: "Csrf Token Fetched Successfully...",
          csrfToken: storedCsrfToken,
        });
});
module.exports = generateCsrf_mw;