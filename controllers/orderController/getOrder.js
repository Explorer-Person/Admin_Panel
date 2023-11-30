const QueryOrder = require("../../db/queries/orderQueries/orderQueries");
const { associations } = require("../associations/associations");
const moment = require("moment");
const sendError = require('../../errors/sendError');

exports.getAllOrder = async (req, res, next) => {
  associations();
  try {
    const orderQueries = new QueryOrder();
    orderQueries
      .getOrder()
      .then((orders) => {
        res.status(200).json({
          status: "success",
          msg: `Orders Brought Successfully `,
          content: orders,
      });
      })
      .catch((err) => {
        sendError("Something Went Wrong - Data Could't Fetched", "fail", 500, next);
      });
  } catch (err) {
    sendError("Something Went Wrong - Data Couldn't Fetched", "fail", 500, next);
  }
};
exports.getOrder = async (req, res, next) => {
  const rootId = req.body.rootId;
  associations();
  try {
    QueryOrder.getOrder(rootId)
      .then((order) => {
        if (order) {
          // Transform Sequelize model instances into the desired TypeScript interfaces
          const formattedSubmitDate = moment(order.date_submitted).format(
            "YYYY-MM-DD"
          );
          const formattedOrderDate = moment(order.order_date).format(
            "YYYY-MM-DD"
          );
          const formattedOrder = {
            rootId: order.root_id,
            amazonOrderId: order.amazon_order_id,
            orderDate: formattedOrderDate,
            status: order.status,
            dateSubmitted: formattedSubmitDate,
            shippingService: order.shipping_service,
            salesChannel: order.sales_channel,
            packingSlipComments: order.packing_slip_comments,
            amazonTrackingCode: order.amazon_tracking_number,
            trackingCode: order.tracking_code,
            emailAddress: order.email_address,
            phone: order.phone,
            name: order.name,
            orderDetails: order.order_details.map((detail) => {
              const formattedDetail = {
                id: detail.content_id, // Assuming content_id is a property of OrderDetails
                element: {
                  emailAddress: detail.email_address,
                  productId: detail.product_id,
                  productTitle: detail.product_title,
                  count: detail.count,
                  branchId: detail.branch_id,
                },
              };
              return formattedDetail;
            }),
            shipmentDetails: order.shipment_details.map((shipmentDetail) => {
              const formattedShipDate = moment(shipmentDetail.ship_date).format(
                "YYYY-MM-DD"
              );
              const formattedDeliveryEstimate = moment(
                shipmentDetail.delivery_estimate
              ).format("YYYY-MM-DD");
              const formattedShipmentDetail = {
                id: shipmentDetail.detail_id,
                element: {
                  trackingCode: shipmentDetail.tracking_code,
                  carrierTrackingCode: shipmentDetail.carrier_tracking_code,
                  shipDate: formattedShipDate,
                  deliveryEstimate: formattedDeliveryEstimate,
                  carrier: shipmentDetail.carrier,
                  name: shipmentDetail.name,
                  addressLine1: shipmentDetail.address_line_1,
                  addressLine2: shipmentDetail.address_line_2,
                  city: shipmentDetail.city,
                  postalCode: shipmentDetail.postal_code,
                  country: shipmentDetail.country,
                  phone: shipmentDetail.phone,
                  emailAddress: shipmentDetail.email_address,
                  branchId: shipmentDetail.branch_id,
                },
              };
              return formattedShipmentDetail;
            }),
            shipmentEvents: order.shipment_details
              .map((shipmentDetail) => {
                const events = shipmentDetail.shipment_events.map((event) => {
                  const formattedEventDate = moment(event.event_date).format(
                    "YYYY-MM-DD"
                  );

                  return {
                    id: event.event_id,
                    detailId: event.event_detail_id,
                    element: {
                      trackingCode: event.tracking_code,
                      carrierTrackingCode: event.carrier_tracking_code,
                      eventDate: formattedEventDate,
                      eventTime: event.event_time,
                      location: event.location,
                      eventDetails: event.event_details,
                      branchId: event.branch_id,
                    },
                  };
                });

                return events;
              })
              .flat(),
          };

          res.status(200).json({
            status: "success",
            msg: `${rootId} - Brought Successfully`,
            content: formattedOrder,
        });
        } else {
          return null; // Order not found
        }
      })
      .catch((err) =>{
        sendError("Something Went Wrong - Data Couldn't Fetched", "fail", 500, next);
      });
  } catch (err) {
    sendError("Something Went Wrong - Data Couldn't Fetched", "fail", 500, next);
  }
};
