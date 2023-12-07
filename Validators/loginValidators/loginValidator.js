const {body, validationResult} = require("express-validator");

const validateLoginInputs = [
    body("username")
    .notEmpty()
    .withMessage("Please enter a valid username...")
    .isString()
    .withMessage("Please enter a valid username...")
    .escape(),

    body("password")
    .notEmpty()
    .withMessage("Please enter a valid password...")
    .isString()
    .withMessage("Please enter a valid password...")
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(403).json({ errors: errors.array() });
        }
        // If validation passes, proceed to the next middleware/route handler
        next();
      },
]

module.exports = validateLoginInputs;