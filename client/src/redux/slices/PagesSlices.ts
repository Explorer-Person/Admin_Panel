import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPagesStateP } from "../../interface/Interfaces";
import { Orders } from "../../interface/ResponseData";

const initialState: initialPagesStateP = {
  displayDetails: [],
  confirmBoxData: {
    id: "",
    status: false,
  },
  sideBarLeft: "-15%", 
};

export const PagesSlices = createSlice({
  name: "pagesEvents",
  initialState,
  reducers: {
    displayDetails: (state, action: PayloadAction<Orders[] | undefined>) => {
      state.displayDetails = action.payload?.map((order) => {
        return {
          id: order.root_id,
          displayInfo: "d-none",
          arrowSide: "⮟",
        };
      }) || [];
    },
    interactDisplayDetails: (state, action: PayloadAction<string>) => {
      state.displayDetails = state.displayDetails.map((element) => {
        if (element.id === action.payload) {
          return {
            ...element,
            displayInfo: element.displayInfo === "d-none" ? "d-flex" : "d-none",
            arrowSide: element.displayInfo === "d-none" ? "⮝" : "⮟",
          };
        }
        return element;
      });
    },
    manageConfirmBox: (state, action: PayloadAction<string>) => {
        state.confirmBoxData = {
            id: action.payload,
            status: action.payload === "" ? false : true, 
        }
    },
    toggleSideBar: (state, action: PayloadAction<string>) =>{
       if(state.sideBarLeft === "0"){
           state.sideBarLeft = "-15%";
       }else{
           state.sideBarLeft = action.payload
       }
    },
  },
});

export const { displayDetails, interactDisplayDetails, manageConfirmBox, toggleSideBar } = PagesSlices.actions;

export default PagesSlices.reducer;
