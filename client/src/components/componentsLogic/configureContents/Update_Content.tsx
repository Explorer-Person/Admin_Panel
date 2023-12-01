import UpdateContentUI from "../../componentsUI/componentPages/Update_Content.UI";
import { useEffect } from "react";
import { useGetAllOrderQuery } from "../../../redux/apis/getAllOrderApi";
import { useAppDispatch, useAppSelector } from "../../../redux/stores/hooks";
import {
  sendRootId,
  takeAllOrderData,
} from "../../../redux/slices/OrderDataSlices";
import { RootState } from "../../../redux/stores/store";
import ErrorPage from "../../errors/ErrorPage";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../errors/LoadingPage";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";


const UpdateContent = () => {
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
    return navigate("/admin/editContent")
  };


  if (orderLoading || csrfLoading) {
    return <LoadingPage/>; // Loading state while fetching data
  }

  if (orderError || csrfError) {
    return <ErrorPage messageTitle="ERROR" messageBody="Something Went Wrong!"/>; // Error state if there's an issue fetching data
  }
  return <UpdateContentUI getOrderContent={getOrderContent} orders={orders} />;
};

export default UpdateContent;
