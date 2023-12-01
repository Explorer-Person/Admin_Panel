import { FormattedOrder } from "./OrderData";
import { Users } from "./UserData";

interface ShipmentEvent {
  event_id: string;
  tracking_code: string;
  carrier_tracking_code: string;
  event_date: string;
  event_time: string;
  location: string;
  event_details: string;
  event_detail_id: string;
  created_at: string;
}

interface Shipment {
  tracking_code: string;
  carrier_tracking_code: string;
  ship_date: string;
  delivery_estimate: string;
  carrier: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  email_address: string;
  detail_id: string;
  created_at: string;
  shipment_events: ShipmentEvent[];
}

interface OrderDetail {
  product_id: string;
  product_title: string;
  count: number;
  created_at: string;
}

export interface Orders {
  root_id: string;
  amazon_order_id: string;
  order_date: string;
  status: string;
  date_submitted: string;
  shipping_service: string;
  sales_channel: string;
  packing_slip_comments: string;
  amazon_tracking_number: string;
  tracking_code: string;
  email_address: string;
  phone: string;
  name: string;
  created_at: string;
  order_details: OrderDetail[];
  shipment_details: Shipment[];
}

export interface ApiResponse {
  errors: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
}

export interface ResponseGetOrderProps {
  status: string;
  msg: string;
  content: FormattedOrder;
}
export interface ResponseGetAllOrderProps {
  status: string;
  msg: string;
  content: Orders[] | undefined;
}

export interface ResponseGetUserProps {
  status: string;
  msg: string;
  content: Users;
}
export interface ResponseGetAllUserProps {
  status: string;
  msg: string;
  content: Users[];
}

export interface ResponseGetCsrfTokenProps {
  status: string;
  msg: string;
  csrfToken: string;
}
export interface ResponseProps {
  data: {
    errors: {
      status: string;
      msg: string;
    }[];
  }
  
  
}

export interface ResponseAuthorizeProps {
  status: string;
  authenticated: boolean,
  rootAccess: boolean,
  msg: string;
}
