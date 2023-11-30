const { body, validationResult } = require("express-validator");
const OrderDetails = require("../../models/orderModels/orderDetail");

const validateAddOrderDetails = [
  body("orderDetails.*.element.productId")
    .notEmpty()
    .withMessage('Please Fill Product ID Input')
    .isString()
    .trim()
    .escape(),
  body("orderDetails.*.element.productTitle")
    .notEmpty()
    .withMessage('Please Fill Product Title Input')
    .isString()
    .isLength({min: 5})
    .withMessage('Please Enter Title Higher Than 5 Char')
    .trim()
    .escape(),
  body("orderDetails.*.element.count")
    .notEmpty()
    .withMessage('Please Fill Count Input')
    .isInt()
    .withMessage("Please Enter Number as Count")
    .trim()
    .escape(),
  body("orderDetails.*.element.emailAddress")
    .notEmpty()
    .isEmail()
    .withMessage("Please Enter a Valid Mail Address as Email")
    .trim()
    .escape(),
  body("orderDetails.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!OrderDetails) {
          resolve(true);
        } else {
          OrderDetails.findOne({ where: { content_id: value } })
            .then((order) => {
              if (order) {
                reject(`This Order Details Already Exists.`);
              } else {
                resolve(true);
              }
            })
            .catch((err) => {
              resolve(true);
            });
        }
      });
    }),
  body("orderDetails.*.element.branchId").notEmpty().isString().trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

const validateUpdateOrderDetails = [
  body("newOrdersData.orderDetails.*.element.productId")
    .notEmpty()
    .withMessage('Please Fill Product ID Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.orderDetails.*.element.productTitle")
    .notEmpty()
    .withMessage('Please Fill Product Title Input')
    .isString()
    .isLength({min: 5})
    .withMessage('Please Enter Title Higher Than 5 Char')
    .trim()
    .escape(),
  body("newOrdersData.orderDetails.*.element.count")
    .notEmpty()
    .withMessage('Please Fill Count Input')
    .isInt()
    .withMessage("Please Enter Number as Count")
    .trim()
    .escape(),
  body("newOrdersData.orderDetails.*.element.emailAddress")
    .notEmpty()
    .isEmail()
    .withMessage("Please Enter a Valid Mail Address as Email")
    .trim()
    .escape(),
  body("newOrdersData.orderDetails.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.orderDetails.*.element.branchId").notEmpty().isString().trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

module.exports = { validateAddOrderDetails, validateUpdateOrderDetails };
