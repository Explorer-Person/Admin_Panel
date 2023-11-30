const OrderDetailQueries = require("../../db/queries/orderQueries/orderDetailQueries");
const OrderQueries = require("../../db/queries/orderQueries/orderQueries");
const ShipmentQueries = require("../../db/queries/orderQueries/shipmentQueries");
const ShipmentEventQueries = require("../../db/queries/orderQueries/shipmentEventsQueries");
const sendError = require('../../errors/sendError');
const { validationResult } = require("express-validator");

exports.updateOrder = async (req, res, next) => {
  const order = await req.body.newOrdersData.order;
  const rootId = await req.body.newOrdersData.order.rootId;

  const newOrder = {
    root_id: order.rootId,
    amazon_order_id: order.amazonOrderId,
    order_date: order.orderDate,
    status: order.status,
    date_submitted: order.dateSubmitted,
    shipping_service: order.shippingService,
    sales_channel: order.salesChannel,
    packing_slip_comments: order.packingSlipComments,
    amazon_tracking_number: order.amazonTrackingCode,
    tracking_code: order.trackingCode,
    email_address: order.emailAddress,
    phone: order.phone,
    name: order.name,
  };

  OrderQueries.updateOrder(rootId, newOrder)
    .then((result) => {
      next();
    })
    .catch((err) => {
      sendError("Something Went Wrong - Order Couldn't Updated", "fail", 500, next);
    });
};

exports.updateOrderDetail = (req, res, next) => {
  const orderDetail = req.body.newOrdersData.orderDetails;

  const newOrderDetail = orderDetail.map((detail) => ({
    product_id: detail.element.productId,
    product_title: detail.element.productTitle,
    count: detail.element.count,
    email_address: detail.element.emailAddress,
    content_id: detail.id,
    branch_id: detail.element.branchId,
  }));
  const status = [
    "product_id",
    "product_title",
    "count",
    "email_address",
    "content_id",
    "branch_id",
  ];

  OrderDetailQueries.updateOrderDetails(newOrderDetail, status)
    .then((result) => {
      next();
    })
    .catch((err) => {
      sendError("Something Went Wrong - Order Detail Couldn't Updated", "fail", 500, next);
    });
};

exports.updateShipmentDetail = (req, res, next) => {
  const shipmentDetail =
    req.body.newOrdersData.shipmentContents.ShipmentDetails;

  const newShipmentDetail = shipmentDetail.map((shipmentDetail) => ({
    tracking_code: shipmentDetail.element.trackingCode,
    carrier_tracking_code: shipmentDetail.element.carrierTrackingCode,
    ship_date: shipmentDetail.element.shipDate,
    delivery_estimate: shipmentDetail.element.deliveryEstimate,
    carrier: shipmentDetail.element.carrier,
    name: shipmentDetail.element.name,
    address_line_1: shipmentDetail.element.addressLine1,
    address_line_2: shipmentDetail.element.addressLine2,
    city: shipmentDetail.element.city,
    postal_code: shipmentDetail.element.postalCode,
    country: shipmentDetail.element.country,
    phone: shipmentDetail.element.phone,
    email_address: shipmentDetail.element.emailAddress,
    detail_id: shipmentDetail.id,
    branch_id: shipmentDetail.element.branchId,
  }));

  const status = [
    "tracking_code",
    "carrier_tracking_code",
    "ship_date",
    "delivery_estimate",
    "carrier",
    "name",
    "address_line_1",
    "address_line_2",
    "city",
    "postal_code",
    "country",
    "phone",
    "email_address",
    "detail_id",
    "branch_id",
  ];

  ShipmentQueries.updateShipmentDetails(newShipmentDetail, status)
    .then((result) => {
      next();
    })
    .catch((err) => {
      sendError("Something Went Wrong - Shipment Detail Couldn't Updated", "fail", 500, next);
    });
};

exports.updateShippingEvent = (req, res, next) => {
  const shipmentEvent = req.body.newOrdersData.shipmentContents.ShipmentEvents;

  const newShipmentEvent = shipmentEvent.map((event) => ({
    event_id: event.id,
    tracking_code: event.element.trackingCode,
    carrier_tracking_code: event.element.carrierTrackingCode,
    event_date: event.element.eventDate,
    event_time: event.element.eventTime,
    location: event.element.location,
    event_details: event.element.eventDetails,
    event_detail_id: event.detailId,
    branch_id: event.element.branchId,
  }));
  const status = [
    "event_id",
    "tracking_code",
    "carrier_tracking_code",
    "event_date",
    "event_time",
    "location",
    "event_details",
    "event_detail_id",
    "branch_id",
  ];

  ShipmentEventQueries.updateShipmentEvent(newShipmentEvent, status)
  .then((result) => {
    const validationErrors = validationResult(req);
      if(validationErrors.array().length > 0){
        return res.status(400).json({ errors: validationErrors.array() });
      }
    res.status(201).json({
      status: "success",
      msg: `${shipmentEvent[0].element.branchId} - Updated Successfully`,
  });
  })
  .catch((err) => {
    sendError("Something Went Wrong - Shipment Event Couldn't Updated", "fail", 500, next);
  });
};
