import { useAppSelector } from "../../../redux/stores/hooks";
import { RootState } from "../../../redux/stores/store";
import showMessage from "../../../messages/showMessage";
import { isValidOrder } from "../../../validator/validateInputs";
import EditContentUI from "../../componentsUI/componentPages/Edit_Content.UI";
import { useUpdateOrderMutation } from "../../../redux/apis/updateOrderApi";
import { OrderData } from "../../../interface/OrderData";
import { ShipmentEventsP } from "../../../interface/Interfaces";
import { useErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../errors/ErrorPage";
import { useGetOrderQuery } from "../../../redux/apis/getOrderApi";
import { useAppDispatch } from "../../../redux/stores/hooks";
import { takeOrderData } from "../../../redux/slices/OrderDataSlices";
import { useEffect } from "react";
import LoadingPage from "../../errors/LoadingPage";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";


const EditContent = () => {
  const dispatch = useAppDispatch();
  const { showBoundary } = useErrorBoundary();

  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;

  const rootId = useAppSelector((state:RootState)=> state.OrderDataReducer.rootId);

  const getOrderProps = {
    rootId: rootId,
    csrfToken: csrfToken ? csrfToken : "", 
  }

  const {data: response, isLoading: orderLoading, isError: orderError} = useGetOrderQuery(getOrderProps);
  const existingOrderData = response?.content;

  const newOrder = useAppSelector(
    (state: RootState) => state.OrderDataReducer.Order
  );
  const newOrderDetails = useAppSelector(
    (state: RootState) => state.OrderDataReducer.OrderDetails
  );
  const newShipmentDetails = useAppSelector(
    (state: RootState) =>
      state.OrderDataReducer.ShipmentContents.ShipmentDetails
  );
  const newShipmentEvents = useAppSelector(
    (state: RootState) => state.OrderDataReducer.ShipmentContents.ShipmentEvents
  );

  const { trackingCode, emailAddress, phone, name } = newOrder;

  const updatedOrderDetails = newOrderDetails.map((detail) => ({
    ...detail,
    element: {
      ...detail.element,
      branchId: rootId,
      emailAddress: emailAddress,
    },
  }));
  const updatedShipmentDetails = newShipmentDetails.map((detail) => ({
    ...detail,
    element: {
      ...detail.element,
      trackingCode: trackingCode,
      branchId: rootId,
      emailAddress: emailAddress,
      phone: phone,
      name: name,
    },
  }));

  const updatedShipmentEvents = newShipmentEvents.map((event) => {
    const matchedDetail = newShipmentDetails.find(
      (detail) => detail.id === event.detailId
    );
    if (matchedDetail) {
      return {
        ...event,
        element: {
          ...event.element,
          carrierTrackingCode: matchedDetail.element.carrierTrackingCode,
          trackingCode: trackingCode,
          branchId: rootId,
        },
      };
    }
  });
  const filteredShipmentEvents = updatedShipmentEvents.filter(
    (event) => event !== undefined
  ) as ShipmentEventsP[];

  const newOrderData: OrderData = {
    order: newOrder,
    orderDetails: updatedOrderDetails,
    shipmentContents: {
      ShipmentDetails: updatedShipmentDetails,
      ShipmentEvents: filteredShipmentEvents,
    },
  };

  const [saveOrder] = useUpdateOrderMutation();

  const handleSubmit = async () => {
    const validationResult = isValidOrder(newOrderData);
    if (validationResult[0].status === false) {
      for (let i = 0; i < validationResult.length; i++) {
        showMessage(validationResult[i].message, "error");
      }
      return;
    }
    const updateOrderProps = {
      newOrdersData: newOrderData,
      csrfToken: csrfToken,
    }
    await saveOrder(updateOrderProps)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        if (result.error && result.error.data && result.error.data.errors) {
          const response = result.error.data.errors;
          showMessage(response[0].msg, "error");
        } else if (
          result.error &&
          result.error.status === "PARSING_ERROR"
        ) {
          showMessage("Order Successfully Saved!", "success");
          // return window.location.assign("/admin/updateContents");
        } else if (result.error && result.error.status === "FETCH_ERROR") {
          showMessage("Server Connection Lost", "error");
          window.location.assign("/admin/hub");
        } else {
          showMessage("Something Went Wrong", "error");
          window.location.assign("/admin/hub");
        }
      })
      .catch((err) => {
        showBoundary(err);
      });
  };


  useEffect(() => {
    if(existingOrderData){
      dispatch(takeOrderData(existingOrderData));
    }
  }, [dispatch, existingOrderData]);

  if(csrfLoading || orderLoading){
    return <LoadingPage/>
  }
  if(csrfError || orderError){
    return <ErrorPage messageTitle="ERROR" messageBody="Something Went Wrong "/>
  }
  if (!existingOrderData || existingOrderData.orderDetails.length === 0) {
    return <ErrorPage messageTitle="Error" messageBody="Order Not Found!" />;
  }
  return <EditContentUI handleSubmit={handleSubmit} />;
};

export default EditContent;
