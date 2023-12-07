const {body, validationResult} = require("express-validator");

const validateLoginInputs = [
    body("username")
    .isEmpty()
    .isString()
    .withMessage("Please enter a valid username...")
    .escape(),

    body("password")
    .isEmpty()
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