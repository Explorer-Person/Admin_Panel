import { configureStore, combineReducers } from "@reduxjs/toolkit";
import InputReducer from "../slices/InputSlices";
import OrderDataReducer from "../slices/OrderDataSlices";
import PagesReducer from "../slices/PagesSlices";
import UserDataReducer from "../slices/UserDataSlices";
import AuthInfoReducer from "../slices/AuthInfoSlices";
import { addOrderApi } from "../apis/addOrderApi";
import { getAllOrderApi } from "../apis/getAllOrderApi";
import { deleteOrderApi } from "../apis/deleteOrderApi";
import { getOrderApi } from "../apis/getOrderApi";
import { updateOrderApi } from "../apis/updateOrderApi";
import { getCsrfTokenApi } from "../apis/getCsrfToken";
import { getAllUserApi } from "../apis/getAllUserApi";
import { setUserApi } from "../apis/setUserApi";
import { authAdminApi } from "../apis/authAdminApi";
import { authorizeApi } from "../apis/authorizeApi";




const reducers = combineReducers({
  InputReducer: InputReducer,
  OrderDataReducer: OrderDataReducer,
  PagesReducer: PagesReducer,
  UserDataReducer: UserDataReducer,
  AuthInfoReducer: AuthInfoReducer,
  [addOrderApi.reducerPath]: addOrderApi.reducer,
  [getAllOrderApi.reducerPath]: getAllOrderApi.reducer,
  [deleteOrderApi.reducerPath]: deleteOrderApi.reducer,
  [getOrderApi.reducerPath]: getOrderApi.reducer,
  [updateOrderApi.reducerPath]: updateOrderApi.reducer,
  [getCsrfTokenApi.reducerPath]: getCsrfTokenApi.reducer,
  [authAdminApi.reducerPath]: authAdminApi.reducer,
  [getAllUserApi.reducerPath]: getAllUserApi.reducer,
  [setUserApi.reducerPath]: setUserApi.reducer,
  [authorizeApi.reducerPath]: authorizeApi.reducer,
});



export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      addOrderApi.middleware,
      getAllOrderApi.middleware,
      deleteOrderApi.middleware,
      getOrderApi.middleware,
      updateOrderApi.middleware,
      getCsrfTokenApi.middleware,
      authAdminApi.middleware,
      getAllUserApi.middleware,
      setUserApi.middleware,
      authorizeApi.middleware,
    );
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
