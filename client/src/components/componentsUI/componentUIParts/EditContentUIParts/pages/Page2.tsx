import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import {
  DisplayP,
  OrderContentsInputP,
  OrderDetailsP,
} from "../../../../../interface/Interfaces";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../redux/stores/hooks";
import { RootState } from "../../../../../redux/stores/store";
import {
  useDecreaseInput,
  useDisplayOldInput,
  useIncreaseInput,
} from "../Actions/Page2.A";
import { OrderDetail } from "../../../../../redux/stores/initialState";
import { addOrderDetailData } from "../../../../../redux/slices/OrderDataSlices";



export const Page2 = ({ display }: DisplayP) => {
  const dispatch = useAppDispatch();
  
  const existsContents = useAppSelector(
    (state: RootState) => state.InputReducer.OrderContents
  );

  const OldOrderData = useAppSelector(
    (state: RootState) => state.OrderDataReducer.OrderData
  );

  const contentId = uuidv4();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsP[]>([]);
  const OrderDetails: OrderDetailsP = {
    id: contentId,
    element: OrderDetail,
  };

  const handleInputChange = (
    event: React.ChangeEvent<unknown>,
    contentId: string
  ) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    setOrderDetails((prevData) => {
      return prevData.map((detail) => {
        if (contentId === detail.id) {
          return {
            ...detail,
            element: {
              ...detail.element,
              [name]: value,
            },
          };
        }
        return detail;
      });
    });
  };

  const displayInput = useDisplayOldInput(
    handleInputChange,
    contentId,
    OldOrderData
  );

  const increaseInput = useIncreaseInput(
    handleInputChange,
    contentId,
    OldOrderData
  );
  const decreaseInput = useDecreaseInput();

  const displayInputArray = () => {
    if(OldOrderData.orderDetails){
      displayInput();
      setOrderDetails(OldOrderData.orderDetails);
    } 
  };

  useEffect(() => {
    if(existsContents.length === 0){
      return displayInputArray();
    }
    return setOrderDetails(OldOrderData.orderDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OldOrderData]);

  const increaseInputArray = () => {
    increaseInput();
    setOrderDetails([...orderDetails, OrderDetails]);
  };
  const decreaseInputArray = (contentId: string) => {
    decreaseInput(contentId);
    setOrderDetails((prevData) => {
      return prevData.filter((element) => {
        return element.id !== contentId;
      });
    });
  };

  useEffect(() => {
    dispatch(addOrderDetailData(orderDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleInputChange]);
  return (
    <Container style={{width: "800px"}} id="2" className={display.display2}>
      <h1>Content Details</h1>
      {existsContents.map((content: OrderContentsInputP) => (
        <Container key={content.id} className="d-flex">
          <Container key={content.id}>
            <Container key={content.id}>{content.element}</Container>
          </Container>
          <Button
            onClick={(e) => decreaseInputArray(e.currentTarget.value)}
            className="h-25 mt-4 bg-danger"
            value={content.id}
          >
            -
          </Button>
        </Container>
      ))}
      <Button onClick={increaseInputArray} className=" mt-4 mx-2">
        Add Product Info
      </Button>
    </Container>
  );
};
