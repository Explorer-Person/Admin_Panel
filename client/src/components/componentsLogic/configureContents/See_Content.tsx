import { useEffect } from "react";
import { useGetAllOrderQuery } from "../../../redux/apis/getAllOrderApi";
import { useAppDispatch, useAppSelector } from "../../../redux/stores/hooks";
import {
  sendRootId,
  takeAllOrderData,
} from "../../../redux/slices/OrderDataSlices";
import { RootState } from "../../../redux/stores/store";
import ErrorPage from "../../errors/ErrorPage";
import SeeContentsUI from "../../componentsUI/componentPages/See_Content.UI";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../errors/LoadingPage";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";

const SeeContents = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;
  const { data: response, isLoading: orderLoading, isError:orderError } = useGetAllOrderQuery(csrfToken ? csrfToken : "");
  const allOrders = response?.content;
  
  const orders = useAppSelector(
    (state: RootState) => state.OrderDataReducer.AllOrdersData
  );

  useEffect(() => {
    dispatch(takeAllOrderData(allOrders));
  }, [allOrders, dispatch]);

  const getOrderContent = (rootId: string) => {
    dispatch(sendRootId(rootId));   
    return navigate("/admin/contentDetail")
  };

  if(csrfLoading || orderLoading){
    return <LoadingPage/>
  }
  if(csrfError || orderError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }
  return <SeeContentsUI getOrderContent={getOrderContent} orders={orders} />;
};

export default SeeContents;
