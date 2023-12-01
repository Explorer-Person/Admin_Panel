/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ContentDetailData,
} from "../../../interface/OrderData";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";
import { useGetOrderQuery } from "../../../redux/apis/getOrderApi";
import { useAppSelector } from "../../../redux/stores/hooks";
import { RootState } from "../../../redux/stores/store";
import ContentDetailUI from "../../componentsUI/componentPages/Content_Detail.UI";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";

const ContentDetail = () => {
  const rootId = useAppSelector(
    (state: RootState) => state.OrderDataReducer.rootId
  );

  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;
  const getOrderProps = {
    rootId: rootId,
    csrfToken: csrfToken ? csrfToken : "",
  }
  const {
    data: response, // Assume 'data' is the property containing the order data
    isLoading,
    isError,
  } = useGetOrderQuery(getOrderProps);
  const orderData = response?.content;

  if(csrfLoading || isLoading){
    return <LoadingPage/>
  }
  if(csrfError || isError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }
  if (!orderData ||orderData.orderDetails.length === 0) {
    return <ErrorPage messageTitle="Error" messageBody="Order Not Found!" />;
  }


  const extractOrderData = () => {
    const { orderDetails, shipmentDetails, shipmentEvents, ...justOrder } =
      orderData;
    return justOrder;
  };

  const updatedShipmentDetails = orderData.shipmentDetails.map((detail) => {
    const terminatedShipmentEvents = orderData.shipmentEvents.filter(
      (event) => event.detailId === detail.id
    );
    return {
      ...detail,
      element: {
        ...detail.element,
        shipmentEvents: terminatedShipmentEvents,
      },
    };
  });

  const contentDetailData: ContentDetailData = {
    order: extractOrderData(),
    orderDetails: orderData.orderDetails,
    shipmentDetails: updatedShipmentDetails,
  };

  

  return <ContentDetailUI contentDetailData={contentDetailData} />;
};

export default ContentDetail;
