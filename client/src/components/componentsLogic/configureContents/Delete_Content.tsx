import { useEffect } from "react";
import { useDeleteOrderMutation } from "../../../redux/apis/deleteOrderApi";
import { useGetAllOrderQuery } from "../../../redux/apis/getAllOrderApi";
import DeleteContentsUI from "../../componentsUI/componentPages/Delete_Content.UI";
import { useAppDispatch, useAppSelector } from "../../../redux/stores/hooks";
import {
  removeOrderData,
  takeAllOrderData,
} from "../../../redux/slices/OrderDataSlices";
import { RootState } from "../../../redux/stores/store";
import LoadingPage from "../../errors/LoadingPage";
import ErrorPage from "../../errors/ErrorPage";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";
import { useErrorBoundary } from "react-error-boundary";

const DeleteContents = () => {
  const dispatch = useAppDispatch();
  const { showBoundary } = useErrorBoundary();

  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;
  const { data: response, isLoading: orderLoading, isError:orderError } = useGetAllOrderQuery(csrfToken ? csrfToken : "");
  const allOrders = response?.content;
  
  const [deleteOrder] = useDeleteOrderMutation();
  const orders = useAppSelector(
    (state: RootState) => state.OrderDataReducer.AllOrdersData
  );

  useEffect(() => {
    dispatch(takeAllOrderData(allOrders));
  }, [allOrders, dispatch]);

  const deleteOrderContent = (rootId: string) => {
    const deleteOrderProps = {
      rootId: rootId,
      csrfToken: csrfToken,
    };
    deleteOrder(deleteOrderProps)
      .then(() => dispatch(removeOrderData(rootId)))
      .catch((err) => showBoundary(err));
  };

  if(csrfLoading || orderLoading){
    return <LoadingPage/>
  }
  if(csrfError ||orderError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }

  return (
    <DeleteContentsUI orders={orders} deleteOrderContent={deleteOrderContent} />
  );
};

export default DeleteContents;
