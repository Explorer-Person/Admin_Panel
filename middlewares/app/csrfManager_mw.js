const csrf = require('csrf');
const tokens = new csrf();

let storedCsrfToken;

exports.generateNewToken = () => {
    const secret = process.env.CSRF_SECRET;
    storedCsrfToken = tokens.create(secret);
    return storedCsrfToken;
};
exports.verifyCsrfToken = (actualCsrfToken) =>{
    const secret = process.env.CSRF_SECRET;
    return tokens.verify(secret, storedCsrfToken, actualCsrfToken)
}


