import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInfoSliceProps, UserAuthInfo } from "../../interface/UserData";



const initialState: AuthInfoSliceProps = {
  userAuthInfo: {
    isAuthUser: false,
    rootAccess: false,
  },
}

 const AuthInfoSlices = createSlice({
    name: "authInfo",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<UserAuthInfo>)=>{
            state.userAuthInfo = action.payload;
        },
    }

});

export const { setAuthUser} = AuthInfoSlices.actions;
export default AuthInfoSlices.reducer;