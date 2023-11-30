const express = require("express");
const {
  addOrder,
  addOrderDetail,
  addShippingEvents,
  addShipment,
} = require("../controllers/orderController/addOrder");
const { getAllOrder, getOrder } = require("../controllers/orderController/getOrder");
const { deleteOrder } = require("../controllers/orderController/deleteOrder");
const { updateOrderDetail, updateShippingEvent, updateOrder, updateShipmentDetail } = require("../controllers/orderController/updateOrder");
const  {validateAddOrder, validateUpdateOrder}  = require("../Validators/orderValidators/orderInputValidator");
const  {validateAddOrderDetails, validateUpdateOrderDetails}  = require("../Validators/orderValidators/orderDetailsInputValidator");
const  {validateAddShipment, validateUpdateShipment}  = require("../Validators/orderValidators/shipmentDetailsInputDetail");
const  {validateAddShippingEvents, validateUpdateShippingEvents} = require("../Validators/orderValidators/shipmentEventsInputValidator");

const order = express.Router();

order.post(
  "/addOrder",
  validateAddOrder,
  validateAddOrderDetails,
  validateAddShipment,
  validateAddShippingEvents,
  addOrder,
  addOrderDetail,
  addShipment,
  addShippingEvents
);
order.post(
  "/updateOrder",
  validateUpdateOrder,
  validateUpdateOrderDetails,
  validateUpdateShipment,
  validateUpdateShippingEvents,
  updateOrder,
  updateOrderDetail,
  updateShipmentDetail,
  updateShippingEvent
);
order.delete("/deleteOrder", deleteOrder);
order.get("/getAllOrder", getAllOrder);
order.post("/getOrder", getOrder);

module.exports = order;
