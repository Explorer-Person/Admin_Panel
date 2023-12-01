const csrf = require('csrf');


const tokens = new csrf();

exports.storedCsrfToken;

exports.generateNewToken = () => {
    const secret = process.env.CSRF_SECRET;
    storedCsrfToken = tokens.create(secret);
    return storedCsrfToken;
};


