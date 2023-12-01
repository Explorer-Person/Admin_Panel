const csrf = require("csrf");
const tokens = new csrf();

let storedCsrfToken;

function generateNewToken() {
  const secret = process.env.CSRF_SECRET;
  storedCsrfToken = tokens.create(secret);
  return storedCsrfToken;
}
function verifyCsrfToken(actualCsrfToken) {
  const secret = process.env.CSRF_SECRET;
  return tokens.verify(secret, storedCsrfToken, actualCsrfToken);
}

module.exports = { generateNewToken, verifyCsrfToken };
