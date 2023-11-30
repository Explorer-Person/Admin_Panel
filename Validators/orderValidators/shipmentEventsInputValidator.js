const { body, validationResult } = require("express-validator");
const ShipmentEvents = require("../../models/orderModels/shipmentEvents");
const sendError = require("../../errors/sendError");

const validateAddShippingEvents = [
  body("shipmentContents.ShipmentEvents.*.element.trackingCode")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.element.carrierTrackingCode")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.element.eventDate")
    .notEmpty()
    .withMessage("Please Fill Event Date Input")
    .isDate()
    .withMessage("Please Enter a Valid Date as Event Date")
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.element.eventTime")
    .notEmpty()
    .withMessage("Please Fill Event Time Input")
    .isTime()
    .withMessage("Please Enter a Valid Time as Event Time")
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.element.location")
    .notEmpty()
    .withMessage("Please Fill Location Input")
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.element.eventDetails")
    .notEmpty()
    .withMessage("Please Fill Event Details Input")
    .isString()
    .trim()
    .escape(),
  body("shipmentContents.ShipmentEvents.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (!ShipmentEvents) {
          resolve(true);
        } else {
          ShipmentEvents.findOne({ where: { event_id: value } })
            .then((order) => {
              if (order) {
                reject(`This Shipment Events Already Exists.`);
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware/route handler
    next();
  },
];

const validateUpdateShippingEvents = [
  body("newOrdersData.shipmentContents.ShipmentEvents.*.element.trackingCode")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body(
    "newOrdersData.shipmentContents.ShipmentEvents.*.element.carrierTrackingCode"
  )
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentEvents.*.element.eventDate")
    .notEmpty()
    .withMessage("Please Fill Event Date Input")
    .isDate()
    .withMessage("Please Enter a Valid Date as Event Date")
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentEvents.*.element.eventTime")
    .notEmpty()
    .withMessage("Please Fill Event Time Input")
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentEvents.*.element.location")
    .notEmpty()
    .withMessage("Please Fill Location Input")
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentEvents.*.element.eventDetails")
    .notEmpty()
    .withMessage("Please Fill Event Details Input")
    .isString()
    .trim()
    .escape(),
  body("newOrdersData.shipmentContents.ShipmentEvents.*.id")
    .notEmpty()
    .isString()
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = { validateAddShippingEvents, validateUpdateShippingEvents };
