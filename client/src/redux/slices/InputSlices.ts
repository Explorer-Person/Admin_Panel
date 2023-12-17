import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OrderContentsInputP,
  OrderDataStateP,
  ShipmentContentsInputP,
  ShipmentEventsInputP,
  SuperUserContentsInputP,
  UserContentsInputP,
} from "../../interface/Interfaces";

const initialState: OrderDataStateP = {
  ShipmentContents: [],
  OrderContents: [],
  numberProduct: 0,
  UserContents: [],
  SuperUserContents: [],
  numberUsers: {
    user: 0,
    superuser: 0,
  },
};

const InputSlice = createSlice({
  name: "inputEvents",
  initialState,
  reducers: {
    addShipmentInput: (
      state,
      action: PayloadAction<ShipmentContentsInputP>
    ) => {
      state.ShipmentContents.push(action.payload);
    },
    removeShipmentInput: (state, action: PayloadAction<string>) => {
      state.ShipmentContents = state.ShipmentContents.filter(
        (content) => content.id !== action.payload
      );
      state.ShipmentContents = state.ShipmentContents.filter((content) =>
        content.events.map((event) => event.detailId !== action.payload)
      );
    },
    addShipmentEventInput: (
      state,
      action: PayloadAction<ShipmentEventsInputP>
    ) => {
      state.ShipmentContents.map((content) => {
        if (content.id === action.payload.detailId) {
          content.events.push(action.payload);
        }
        return content;
      });
    },
    removeShipmentEventInput: (state, action: PayloadAction<string>) => {
      state.ShipmentContents.map((content) => {
        content.events = content.events.filter((event) => {
          if (content.id === event.detailId) {
            return event.eventsId !== action.payload;
          }
          return event;
        });
      });
    },
    addOrderDetailInput: (
      state,
      action: PayloadAction<OrderContentsInputP>
    ) => {
      state.OrderContents.push(action.payload);
      state.numberProduct++;
    },
    removeOrderDetailInput: (state, action: PayloadAction<string>) => {
      state.OrderContents = state.OrderContents.filter((content) => {
        return content.id !== action.payload;
      });
      state.numberProduct--;
    },
    addUserInput: (state, action: PayloadAction<UserContentsInputP>) => {
      state.UserContents.push(action.payload);
      state.numberUsers.user++;
    },
    addSuperUserInput: (
      state,
      action: PayloadAction<SuperUserContentsInputP>
    ) => {
      state.SuperUserContents.push(action.payload);
      state.numberUsers.superuser++;
    },
    removeUserInput: (state, action: PayloadAction<string>) => {
      state.UserContents = state.UserContents.filter((content) => {
        return content.id !== action.payload;
      });
    },
    removeSuperUserInput: (state, action: PayloadAction<string>) => {
      state.SuperUserContents = state.SuperUserContents.filter((content) => {
        return content.id !== action.payload;
      });
    },
    editStatusUserInput: (state, action: PayloadAction<UserContentsInputP>) => {
      state.UserContents = state.UserContents.map(content =>{
        if(content.id === action.payload.id){

            return {
              ...content, 
              element: action.payload.element,
              status: action.payload.status,
              id: action.payload.id
            }
        }
        return content
      });
    },
    editStatusSuperUserInput: (state, action: PayloadAction<UserContentsInputP>) => {
      state.SuperUserContents = state.SuperUserContents.map(content =>{
        if(content.id === action.payload.id){
            return {
              ...content, 
              element: action.payload.element,
              status: action.payload.status,
              id: action.payload.id
            }
        }
        return content
      });
    },
    filterUserInput: (state, action: PayloadAction<string[]>)=>{
      state.UserContents = state.UserContents.filter(content=>{
        return action.payload.find(id=>{
           return id === content.id;
        })
      })
    },
    filterSuperUserInput: (state, action: PayloadAction<string[]>)=>{
      state.SuperUserContents = state.SuperUserContents.filter(content=>{
        return action.payload.find(id=>{
           return id === content.id;
        })
      })
    }


    // Add more reducers as needed
  },
});

export const {
  addShipmentInput,
  removeShipmentInput,
  addShipmentEventInput,
  removeShipmentEventInput,
  addOrderDetailInput,
  removeOrderDetailInput,
  addUserInput,
  addSuperUserInput,
  removeUserInput,
  removeSuperUserInput,
  editStatusUserInput,
  editStatusSuperUserInput,
  filterUserInput,
  filterSuperUserInput,
} = InputSlice.actions;
export default InputSlice.reducer;
