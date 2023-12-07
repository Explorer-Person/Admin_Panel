const { body, validationResult } = require("express-validator");
// const User = require("../../models/userModels/user");
// const SuperUser = require("../../models/userModels/superUser");


const validateUser = [
  body("*.user_id")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("*.username")
    .notEmpty()
    .withMessage('Please Fill Username Input')
    .isString()
    .isLength({min: 5})
    .withMessage('Please Enter Title Higher Than 5 Char')
    .trim()
    .escape(),
  body("*.password")
    .notEmpty()
    .withMessage('Please Fill Password Input')
    .isString()
    .withMessage("Please Enter a Valid Password")
    .trim()
    .escape(),
  body("*.email")
    .notEmpty()
    .withMessage('Please Fill Email Input')
    .isEmail()
    .withMessage("Please Enter a Valid Mail Address as Email")
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

module.exports = validateUser;