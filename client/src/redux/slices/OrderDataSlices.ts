import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FormattedOrder,
  Order,
  OrderDataState,
  ShipmentContents,
} from "../../interface/OrderData";
import { initialOrder, newOrder } from "../stores/initialState";
import { OrderDetailsP } from "../../interface/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { Orders } from "../../interface/ResponseData";

const initialOrderState: OrderDataState = {
  Order: initialOrder,
  OrderDetails: [],
  ShipmentContents: {
    ShipmentDetails: [],
    ShipmentEvents: [],
  },
  detailsId: "",
  eventsId: uuidv4(),
  rootId: "",
  AllOrdersData: [],
  OrderData: newOrder,
  FilteredOrdersData: [],
};

const OrderDataSlice = createSlice({
  name: "orderData",
  initialState: initialOrderState,
  reducers: {
    addOrderData: (state, action: PayloadAction<Order>) => {
      state.Order = action.payload;
    },
    addOrderDetailData: (state, action: PayloadAction<OrderDetailsP[]>) => {
      state.OrderDetails = action.payload;
    },
    addShipmentContentsData: (
      state,
      action: PayloadAction<ShipmentContents>
    ) => {
      state.ShipmentContents = action.payload;
    },
    generatedDetailId: (state, action: PayloadAction<string>) => {
      state.detailsId = action.payload;
    },
    generatedEventId: (state) => {
      state.eventsId = uuidv4();
    },
    sendRootId: (state, action: PayloadAction<string>)=>{
        state.rootId = action.payload;
    },
    takeAllOrderData: (state, action: PayloadAction<Orders[] | undefined>) => {
      state.AllOrdersData = action.payload;
    },
    removeOrderData: (state, action: PayloadAction<string>) => {
      state.AllOrdersData = state.AllOrdersData?.filter((order) => {
        return order.root_id !== action.payload;
      });
    },
    takeOrderData: (state, action: PayloadAction<FormattedOrder>) => {
      state.OrderData = action.payload;
    },
    resetOrderData: (state) =>{
      state.OrderData = newOrder;
    },
    filterOrderData: (state, action: PayloadAction<string>) =>{
      action.payload === "" ? state.FilteredOrdersData = [] : state.FilteredOrdersData = state.AllOrdersData?.filter((order)=>{
         return order.tracking_code.includes(action.payload) || order.email_address.includes(action.payload) || order.name.includes(action.payload)
         || order.status.includes(action.payload);
       })
    } 
  },
});

export const {
  addOrderData,
  addOrderDetailData,
  addShipmentContentsData,
  generatedDetailId,
  generatedEventId,
  takeAllOrderData,
  removeOrderData,
  takeOrderData,
  resetOrderData,
  filterOrderData,
  sendRootId,
} = OrderDataSlice.actions;
export default OrderDataSlice.reducer;
