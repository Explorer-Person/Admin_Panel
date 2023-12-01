import { ShipmentDetail } from "../redux/stores/initialState";
import { OrderDetailsP, ShipmentDetailsP, ShipmentEventsP } from "./Interfaces";
import { Orders } from "./ResponseData";

export interface OrderData {
  order: Order;
  orderDetails: OrderDetailsP[];
  shipmentContents: ShipmentContents;
}

export interface Order {
  rootId: string;
  amazonOrderId: string;
  orderDate: string;
  status: string;
  dateSubmitted: string;
  shippingService: string;
  salesChannel: string;
  packingSlipComments: string;
  trackingCode: string;
  amazonTrackingCode: string;
  emailAddress: string;
  name: string;
  phone: string;

  // OrderProducts: OrderProducts[],

  // ShipmentContents: ShipmentContents[];
}

export interface ShipmentDetail {
  trackingCode: string;
  carrierTrackingCode: string;
  shipDate: string;
  deliveryEstimate: string;
  carrier: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  emailAddress: string;
  branchId: string;
}
export interface ShipmentEvents {
  trackingCode: string;
  carrierTrackingCode: string;
  eventDate: string;
  eventTime: string;
  location: string;
  eventDetails: string;
  branchId: string;
}

export interface ShipmentContents {
  ShipmentDetails: ShipmentDetailsP[];
  ShipmentEvents: ShipmentEventsP[];
}

export interface OrderDetail {
  productId: string;
  productTitle: string;
  count: string;
  emailAddress: string;
  branchId: string;
}

export interface OrderDataState {
  Order: Order;
  OrderDetails: OrderDetailsP[];
  ShipmentContents: ShipmentContents;
  detailsId: string;
  eventsId: string;
  rootId: string;
  AllOrdersData: Orders[] | undefined;
  OrderData: FormattedOrder;
  FilteredOrdersData: Orders[] | undefined;
}

//-------------------------//

export interface FormattedOrderDetail {
  id: string;
  element: {
    emailAddress: string;
    productId: string;
    productTitle: string;
    count: string;
    branchId: string;
  };
}

export interface FormattedShipmentEvent {
  id: string;
  detailId: string;
  element: {
    trackingCode: string;
    carrierTrackingCode: string;
    eventDate: string;
    eventTime: string;
    location: string;
    eventDetails: string;
    branchId: string;
  };
}

export interface FormattedShipmentDetail {
  id: string;
  element: {
    trackingCode: string;
    carrierTrackingCode: string;
    shipDate: string;
    deliveryEstimate: string;
    carrier: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    emailAddress: string;
    branchId: string;
  };
}

export interface FormattedOrder {
  rootId: string;
  amazonOrderId: string;
  orderDate: string;
  status: string;
  dateSubmitted: string;
  shippingService: string;
  salesChannel: string;
  packingSlipComments: string;
  amazonTrackingCode: string;
  trackingCode: string;
  emailAddress: string;
  name: string;
  phone: string;
  orderDetails: FormattedOrderDetail[];
  shipmentDetails: FormattedShipmentDetail[];
  shipmentEvents: FormattedShipmentEvent[];
}

export interface OtherFormattedShipmentDetail {
  id: string;
  element: {
    trackingCode: string;
    carrierTrackingCode: string;
    shipDate: string;
    deliveryEstimate: string;
    carrier: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    emailAddress: string;
    branchId: string;
    shipmentEvents: FormattedShipmentEvent[];
  };
}

export interface ContentDetailData {
  order: {
    rootId: string;
    amazonOrderId: string;
    orderDate: string;
    status: string;
    dateSubmitted: string;
    shippingService: string;
    salesChannel: string;
    packingSlipComments: string;
    amazonTrackingCode: string;
    trackingCode: string;
    emailAddress: string;
  };
  orderDetails: FormattedOrderDetail[];
  shipmentDetails: OtherFormattedShipmentDetail[];
}

export interface AddOrderProps {
  ordersData: Partial<OrderData>;
  csrfToken: string | undefined;
}

export interface DeleteOrderProps {
  rootId: string;
  csrfToken: string | undefined;
}

export interface UpdateOrderProps {
  newOrdersData: Partial<OrderData>;
  csrfToken: string | undefined;
}

export interface GetOrderProps {
  rootId: string;
  csrfToken: string | undefined;
}
