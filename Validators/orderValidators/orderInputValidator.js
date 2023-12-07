const { body, validationResult } = require("express-validator");
const Order = require("../../models/orderModels/order");

const validateAddOrder = [
  body("order.rootId")
    .notEmpty()
    .isUUID()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!Order) {
          resolve(true);
        } else {
          Order.findOne({ where: { root_id: value } })
            .then((order) => {
              if (order) {
                reject(`This Order Already Exists`);
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
  body("order.amazonOrderId")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!Order) {
          resolve(true);
        } else {
          Order.findOne({ where: { amazon_order_id: value } })
            .then((order) => {
              if (order) {
                reject(`Amazon Order Id is already used.`);
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
  body("order.orderDate")
    .notEmpty()
    .isDate()
    .trim()
    .escape(),
  body("order.status").notEmpty().withMessage('Please Fill Status Input').isString().trim().escape(),
  body("order.dateSubmitted")
    .notEmpty()
    .isDate()
    .withMessage("Please Enter a Valid Date as Submitted Date")
    .trim()
    .escape(),
  body("order.shippingService")
    .notEmpty()
    .withMessage('Please Fill Shipping Service Input')
    .isString()
    .trim()
    .escape(),
  body("order.salesChannel").notEmpty().isString().escape(),
  body("order.packingSlipComments").notEmpty().isString().trim().escape(),
  body("order.amazonTrackingCode")
    .notEmpty()
    .withMessage('Please Fill Amazon Tracking Code Input')
    .isUUID()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!Order) {
          resolve(true);
        } else {
          Order.findOne({ where: { amazon_tracking_number: value } })
            .then((order) => {
              if (order) {
                reject(`Amazon Tracking Code is already used.`);
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
  body("order.trackingCode")
    .notEmpty()
    .withMessage('Please Fill Tracking Code Input')
    .isString()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!Order) {
          resolve(true);
        } else {
          Order.findOne({ where: { tracking_code: value } })
            .then((order) => {
              if (order) {
                reject(`Tracking Code is already used.`);
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
  body("order.emailAddress")
    .notEmpty()
    .withMessage('Please Fill Email Input')
    .isEmail()
    .withMessage("Please Enter a Valid Mail Address as Email")
    .trim()
    .escape(),
  body("order.phone")
    .notEmpty()
    .withMessage('Please Fill Phone Input')
    .isMobilePhone()
    .withMessage("Please Enter a Valid Phone Number as Phone")
    .trim()
    .escape(),
  body("order.name")
    .notEmpty()
    .withMessage('Please Fill Name Input')
    .isString()
    .isLength({ min: 5 })
    .withMessage("Please Enter Title Higher Than 5 Char")
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



const validateUpdateOrder = [
  body("newOrdersData.order.rootId")
    .notEmpty()
    .isUUID()
    .trim()
    .escape(),
  body("newOrdersData.order.amazonOrderId")
    .notEmpty()
    .withMessage('Please Fill Amazon Order ID Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.order.orderDate")
    .notEmpty()
    .withMessage('Please Fill Order Date Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Order Date")
    .trim()
    .escape(),
  body("newOrdersData.order.status").notEmpty().withMessage('Please Fill Status Input').isString().trim().escape(),
  body("newOrdersData.order.dateSubmitted")
    .notEmpty()
    .withMessage('Please Fill Submitted Date Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Submitted Date")
    .trim()
    .escape(),
  body("newOrdersData.order.shippingService")
    .notEmpty()
    .withMessage('Please Fill Shipping Service Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.order.salesChannel").notEmpty().isString().escape(),
  body("newOrdersData.order.packingSlipComments").notEmpty().isString().trim().escape(),
  body("newOrdersData.order.amazonTrackingCode")
    .notEmpty()
    .withMessage('Please Fill Amazon Tracking Code Input')
    .isUUID()
    .trim()
    .escape(),
  body("newOrdersData.order.trackingCode")
    .notEmpty()
    .withMessage('Please Fill Tracking Code Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.order.emailAddress")
    .notEmpty()
    .withMessage('Please Fill Email Input')
    .isEmail()
    .withMessage("Please Enter a Valid Mail Address as Email")
    .trim()
    .escape(),
  body("newOrdersData.order.phone")
    .notEmpty()
    .withMessage('Please Fill Phone Input')
    .isMobilePhone()
    .withMessage("Please Enter a Valid Phone Number as Phone")
    .trim()
    .escape(),
  body("newOrdersData.order.name")
    .notEmpty()
    .withMessage('Please Fill Name Input')
    .isString()
    .isLength({ min: 5 })
    .withMessage("Please Enter Title Higher Than 5 Char")
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

module.exports = { validateAddOrder, validateUpdateOrder };
