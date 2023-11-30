const { body, validationResult } = require("express-validator");
const ShipmentDetails = require("../../models/orderModels/shipmentDetail");
const sendError = require("../../errors/sendError");

const validateAddShipment = [
  body("shipmentContents.ShipmentDetails.*.element.trackingCode")
    .notEmpty()
    .isUUID()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.carrierTrackingCode")
    .notEmpty()
    .withMessage('Please Fill Carrier Tracking Code Input')
    .isUUID()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!ShipmentDetails) {
          resolve(true);
        } else {
          ShipmentDetails.findOne({ where: { carrier_tracking_code: value } })
            .then((order) => {
              if (order) {
                reject(`Carrier Tracking Code is already used.`);
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
  body("shipmentContents.ShipmentDetails.*.element.shipDate")
    .notEmpty()
    .withMessage('Please Fill Ship Date Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Ship Date Value")
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.deliveryEstimate")
    .notEmpty()
    .withMessage('Please Fill Delivery Estimate Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Estimate Delivery Date")
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.carrier")
    .notEmpty()
    .withMessage('Please Fill Carrier Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.name")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.addressLine1")
    .notEmpty()
    .withMessage('Please Fill Address Line 1 Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.addressLine2")
    .notEmpty()
    .withMessage('Please Fill Address Line 2 Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.city")
    .notEmpty()
    .withMessage('Please Fill City Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.postalCode")
    .notEmpty()
    .withMessage('Please Fill Postal Code Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.country")
    .notEmpty()
    .withMessage('Please Fill Country Input')
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.phone")
    .notEmpty()
    .isMobilePhone()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.element.emailAddress")
    .notEmpty()
    .isEmail()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentDetails.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!ShipmentDetails) {
          resolve(true);
        } else {
          ShipmentDetails.findOne({ where: { detail_id: value } })
            .then((order) => {
              if (order) {
                reject(`This Shipment Details Already Exists.`);
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
  body("shipmentContents.ShipmentDetails.*.element.branchId")
    .notEmpty()
    .isString()
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

const validateUpdateShipment = [
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.trackingCode")
    .notEmpty()
    .isUUID()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.carrierTrackingCode")
    .notEmpty()
    .withMessage('Please Fill Carrier Tracking Code Input')
    .isUUID()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.shipDate")
    .notEmpty()
    .withMessage('Please Fill Ship Date Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Ship Date Value")
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.deliveryEstimate")
    .notEmpty()
    .withMessage('Please Fill Delivery Estimate Input')
    .isDate()
    .withMessage("Please Enter a Valid Date as Estimate Delivery Date")
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.carrier")
    .notEmpty()
    .withMessage('Please Fill Carrier Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.name")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.addressLine1")
    .notEmpty()
    .withMessage('Please Fill Address Line 1 Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.addressLine2")
    .notEmpty()
    .withMessage('Please Fill Address Line 2 Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.city")
    .notEmpty()
    .withMessage('Please Fill City Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.postalCode")
    .notEmpty()
    .withMessage('Please Fill Postal Code Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.country")
    .notEmpty()
    .withMessage('Please Fill Country Input')
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.phone")
    .notEmpty()
    .isMobilePhone()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.emailAddress")
    .notEmpty()
    .isEmail()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentDetails.*.element.branchId")
    .notEmpty()
    .isString()
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

module.exports = { validateUpdateShipment, validateAddShipment };
