import { OrderDetail, ShipmentDetail, ShipmentEvents } from "./OrderData";

import { Orders } from "./ResponseData";

export interface OrderDataStateP {
  ShipmentContents: ShipmentContentsInputP[];
  OrderContents: OrderContentsInputP[];
  numberProduct: number;
  UserContents: UserContentsInputP[];
  SuperUserContents: SuperUserContentsInputP[];
  numberUsers: NumberUsers
}
export interface NumberUsers{
  user: number;
  superuser: number;
}

export interface UserContentsInputP{
  id: string;
  status: boolean;
  element: JSX.Element;
}
export interface SuperUserContentsInputP{
  id: string;
  status: boolean;
  element: JSX.Element;
}

export interface HandleSubmitUserProps{
  handleSubmitUser: ()=> void;
  handleSubmitSuperUser: ()=> void;
}

export interface AdminLoginPageProps{
  handleLoginInputs: (event: React.ChangeEvent<unknown>)=> void;
  handleSubmitLogin: ()=> void;
}

export interface ShipmentContentsInputP {
  id: string;
  element: JSX.Element;
  events: ShipmentEventsInputP[];
}

export interface ShipmentEventsInputP {
  element: JSX.Element;
  eventsId: string;
  detailId: string;
}

export interface OrderContentsInputP {
  id: string;
  element: JSX.Element
}


export interface OrderDetailsP {
  id: string;
  element: OrderDetail;
}
export interface ShipmentDetailsP {
  id: string;
  element: ShipmentDetail;
}
export interface ShipmentEventsP {
  id: string;
  element: ShipmentEvents;
  detailId: string
}

export interface DisplayP {
  display: {
    display1: string;
    display2: string;
    display3: string;
  };
}

export interface DisplayP3 {
  display: {
    display1: string;
    display2: string;
    display3: string;
  };
  handleSubmit: ()=> void;
}


export interface deleteContentUIProps{
  deleteOrderContent: (rootId: string)=>void;
  orders: Orders[] | undefined;
}

export interface updateContentUIProps{
  getOrderContent: (rootId: string)=>void;
  orders: Orders[] | undefined;
}

export interface ErrorPageUIProps{
  messageBody: string;
  messageTitle: string;
}

export interface initialPagesStateP{
  displayDetails: displayDetailsP[];
  confirmBoxData: confirmBoxDataP;
  sideBarLeft: string;
}

export interface confirmBoxDataP{
  id: string;
  status: boolean;
}

export type displayDetailsP = {
  id: string;
  displayInfo: string;
  arrowSide: string;
};