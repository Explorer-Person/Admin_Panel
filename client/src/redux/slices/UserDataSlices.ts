import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { UserDataState, Users } from "../../interface/UserData";


const initialState: UserDataState = {
    AllUserData: [],
    AllSuperUserData: [],
}

const UserDataSlices = createSlice({
    name: "userData",
    initialState,
    reducers: {
       takeAllUserData: (state, action: PayloadAction<Users[] | undefined>) =>{
        if(action.payload){
            state.AllUserData = action.payload;
        }
        state.AllUserData;
       },
       takeAllSuperUserData: (state, action: PayloadAction<Users[] | undefined>) =>{
        if(action.payload){
            state.AllSuperUserData = action.payload;
        }
        state.AllUserData;
       },
    }
});

export const {takeAllUserData, takeAllSuperUserData} = UserDataSlices.actions;  
export default UserDataSlices.reducer;