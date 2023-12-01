import AddContentUI from "../../componentsUI/componentPages/Add_Content.UI";
import { useAppDispatch, useAppSelector } from "../../../redux/stores/hooks";
import { RootState } from "../../../redux/stores/store";
import { useAddOrderMutation } from "../../../redux/apis/addOrderApi";
import { OrderData } from "../../../interface/OrderData";
import showMessage from "../../../messages/showMessage";
import { isValidOrder } from "../../../validator/validateInputs";
import { v4 as uuidv4 } from "uuid";
import { ShipmentEventsP } from "../../../interface/Interfaces";
import { useErrorBoundary } from "react-error-boundary";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";
import { setAuthUser } from "../../../redux/slices/AuthInfoSlices";

const newRootId = uuidv4();

const AddContent = () => {
  const dispatch = useAppDispatch();
  const { showBoundary } = useErrorBoundary();
 
  const order = useAppSelector(
    (state: RootState) => state.OrderDataReducer.Order
  );
  const orderDetails = useAppSelector(
    (state: RootState) => state.OrderDataReducer.OrderDetails
  );
  const shipmentDetails = useAppSelector(
    (state: RootState) =>
      state.OrderDataReducer.ShipmentContents.ShipmentDetails
  );
  const shipmentEvents = useAppSelector(
    (state: RootState) => state.OrderDataReducer.ShipmentContents.ShipmentEvents
  );
  const { trackingCode, emailAddress, phone, name } = useAppSelector(
    (state: RootState) => state.OrderDataReducer.Order
  );

  const updatedOrder = {
    ...order,
    rootId: newRootId,
  };

  const updatedOrderDetails = orderDetails.map((detail) => ({
    ...detail,
    element: {
      ...detail.element,
      branchId: newRootId,
      emailAddress: emailAddress,
    },
  }));
  const updatedShipmentDetails = shipmentDetails.map((detail) => ({
    ...detail,
    element: {
      ...detail.element,
      trackingCode: trackingCode,
      branchId: newRootId,
      emailAddress: emailAddress,
      name: name,
      phone: phone,
    },
  }));

  const updatedShipmentEvents = shipmentEvents.map((event) => {
    const matchedDetail = shipmentDetails.find(
      (detail) => detail.id === event.detailId
    );
    if (matchedDetail) {
      return {
        ...event,
        element: {
          ...event.element,
          carrierTrackingCode: matchedDetail.element.carrierTrackingCode,
          trackingCode: trackingCode,
          branchId: newRootId,
        },
      };
    }
  });
  const filteredShipmentEvents = updatedShipmentEvents.filter(
    (event) => event !== undefined
  ) as ShipmentEventsP[];

  const Order: OrderData = {
    order: updatedOrder,
    orderDetails: updatedOrderDetails,
    shipmentContents: {
      ShipmentDetails: updatedShipmentDetails,
      ShipmentEvents: filteredShipmentEvents,
    },
  };

  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;
  const [addOrder] = useAddOrderMutation();


  const handleSubmit = async () => {
    const validationResult = isValidOrder(Order);
    if (validationResult[0].status === false) {
      for (let i = 0; i < validationResult.length; i++) {
        showMessage(validationResult[i].message, "error");
      }
      return;
    }
    const addOrderProps = {
      ordersData: Order,
      csrfToken: csrfToken
    }
    await addOrder(addOrderProps)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {

        if (
          result.error &&
          result.error.data &&
          result.error.data.errors[0].type === "field"
        ) {
          const response = result.error.data.errors;
          showMessage(response[0].msg, "error");
        }
        else if(result.data.status === "success"){
          showMessage("Order Successfully Saved!", "success");
          return window.location.assign("/admin/seeContents")
        }
        else if(result.error.status === "FETCH_ERROR"){
          showMessage("Connection Could Be Lost", "error");
        }
      
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any)=>{
        if(result && result.data) {
          dispatch(setAuthUser(result.data.authenticated))
          return  window.location.replace("http://localhost:3030/updateContents");
        } 
      })
      .catch((err) => {
        showBoundary(err);
      });
  };

  
  if(csrfLoading){
    return <LoadingPage/>
  }
  if(csrfError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }

  return <AddContentUI handleSubmit={handleSubmit} />;
};

export default AddContent;
