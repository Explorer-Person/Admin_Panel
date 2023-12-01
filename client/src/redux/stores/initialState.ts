import { Order, FormattedOrderDetail, FormattedOrder, FormattedShipmentDetail, FormattedShipmentEvent } from "../../interface/OrderData";

export const initialOrder: Order = {
  rootId: "",
  amazonOrderId: "",
  status: "",
  orderDate: "",
  dateSubmitted: "",
  shippingService: "",
  salesChannel: "",
  packingSlipComments: "",
  trackingCode: "",
  amazonTrackingCode: "",
  emailAddress: "",
  name: "",
  phone: "",
};

export const OrderDetail = {
  count: "",
  productTitle: "",
  productId: "",
  emailAddress: "",
  branchId: "",
};

export const ShipmentDetail = {
  trackingCode: initialOrder.trackingCode,
  carrierTrackingCode: "",
  shipDate: "",
  deliveryEstimate: "",
  carrier: "",
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
  emailAddress: "",
  branchId: "",
};

export const ShipmentEvent = {
  trackingCode: ShipmentDetail.trackingCode,
  carrierTrackingCode: ShipmentDetail.carrierTrackingCode,
  eventDate: "",
  eventTime: "",
  location: "",
  eventDetails: "",
  branchId: "",
};


export const newOrder : FormattedOrder = {
  rootId: "",
  amazonOrderId: "",
  orderDate: "",
  status: "",
  dateSubmitted: "",
  shippingService: "",
  salesChannel: "",
  packingSlipComments: "",
  amazonTrackingCode: "",
  trackingCode: "",
  emailAddress: "",
  name: "",
  phone: "",
  orderDetails: [] as FormattedOrderDetail[],
  shipmentDetails: [] as FormattedShipmentDetail[],
  shipmentEvents: [] as FormattedShipmentEvent[],
}