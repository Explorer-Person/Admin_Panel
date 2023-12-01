const QueryOrder = require("../../db/queries/orderQueries/orderQueries");
const QueryOrderDetails = require("../../db/queries/orderQueries/orderDetailQueries");
const QueryShipmentEvents = require("../../db/queries/orderQueries/shipmentEventsQueries");
const QueryShipments = require("../../db/queries/orderQueries/shipmentQueries");
const { validationResult } = require("express-validator");
const sendError = require("../../errors/sendError");

exports.addOrder = async (req, res, next) => {
  const { order } = req.body;
  const {
    rootId,
    amazonOrderId,
    orderDate,
    status,
    dateSubmitted,
    shippingService,
    salesChannel,
    packingSlipComments,
    amazonTrackingCode,
    trackingCode,
    emailAddress,
    phone,
    name,
  } = order;

  const orderData = {
    root_id: rootId,
    amazon_order_id: amazonOrderId,
    order_date: orderDate,
    status,
    date_submitted: dateSubmitted,
    shipping_service: shippingService,
    sales_channel: salesChannel,
    packing_slip_comments: packingSlipComments,
    amazon_tracking_number: amazonTrackingCode,
    tracking_code: trackingCode,
    email_address: emailAddress,
    phone: phone,
    name: name,
  };

  const orderQueries = new QueryOrder(orderData);

  orderQueries
    .addOrder()
    .then((result) => {
      req.orderData = orderData; // Store order data for later use if needed
      next();
    })
    .catch((err) => {
      return sendError("Something Went Wrong - Order Couldn't Added", "fail", 500, next);
    });
};

exports.addOrderDetail = async (req, res, next) => {
  const { orderDetails } = await req.body;

  const orderDetailData = orderDetails.map((detail) => ({
    product_id: detail.element.productId,
    product_title: detail.element.productTitle,
    count: detail.element.count,
    email_address: detail.element.emailAddress,
    content_id: detail.id,
    branch_id: detail.element.branchId,
  }));

  const orderQueries = new QueryOrderDetails(orderDetailData);

  orderQueries
    .addOrder()
    .then((result) => {
      req.orderDetailData = orderDetailData; // Store order detail data for later use if needed
      next();
    })
    .catch((err) => {
      return sendError("Something Went Wrong - Order Detail Couldn't Added", "fail", 500, next);
    });
};

exports.addShipment = async (req, res, next) => {
  const { ShipmentDetails } = req.body.shipmentContents;

  // const cleanedPhoneNumber = await phone.replace(/\D/g, "");

  const shipmentData = await ShipmentDetails.map((shipmentDetail) => ({
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

  const orderQueries = new QueryShipments(shipmentData);

  orderQueries
    .addOrder()
    .then(async (result) => {
      req.shipmentData = shipmentData; // Store shipment data for later use if needed
      next();
    })
    .catch((err) => {
      return sendError("Something Went Wrong - Shipment Detail Couldn't Added", "fail", 500, next);
    });
};

exports.addShippingEvents = async (req, res, next) => {
  const { ShipmentEvents } = req.body.shipmentContents;

  const shippingEventData = await ShipmentEvents.map((event) => ({
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

  const orderQueries = new QueryShipmentEvents(shippingEventData);

  orderQueries
    .addOrder()
    .then((result) => {
      req.shippingEventData = shippingEventData; // Store shipping event data for later use if needed

      const validationErrors = validationResult(req);
      if(!validationErrors.array.length > 0){
        return res.status(400).json({ errors: validationErrors.array() });
      }

      res
        .status(201)
        .json({
          status: "success",
          msg: "Order Added Successfully",
        });
    })
    .catch((err) => {
      return sendError("Something Went Wrong - Shipment Event Couldn't Added", "fail", 500, next);
    });
};
