const cors = require("cors");
const express = require('express');
const cors_mw = express();


const allowedOrigins = [process.env.CLIENT];

cors_mw.use(
    cors({
        origin:
        function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified origin.';
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        methods: ['GET,PUT,POST,DELETE'],
        credentials: true,
    })
)
module.exports = cors_mw;

