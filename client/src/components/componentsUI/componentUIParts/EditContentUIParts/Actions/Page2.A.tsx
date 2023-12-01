import { FloatingLabel, Form, Container } from "react-bootstrap";
import { useAppDispatch } from "../../../../../redux/stores/hooks";
import {
  addOrderDetailInput,
  removeOrderDetailInput,
} from "../../../../../redux/slices/InputSlices";
import { OrderContentsInputP } from "../../../../../interface/Interfaces";
import { FormattedOrder } from "../../../../../interface/OrderData";
// import { RootState } from "../../../../../redux/stores/store";


type MyChangeEvent = React.ChangeEvent<unknown>;

const generateNewContent = (
  handleInputChange: (event: MyChangeEvent, contentId: string) => void,
  contentId: string,
  OldOrderData: FormattedOrder
) => {

  const oldElement = OldOrderData.orderDetails.map((orderData) => 
    {
       const orderDetail = {
        contentId: orderData.id,
        element: (
          <Container className="d-flex justify-content-center" key={contentId}>
        <FloatingLabel
         controlId={`productId-${orderData.id}`}
          label="Product ID"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="productId"
            defaultValue={orderData.element.productId}
            onChange={(e) => handleInputChange(e, orderData.id)}
            placeholder="Enter Product ID"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`productTitle-${orderData.id}`}
          label="Product Title"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="productTitle"
            defaultValue={orderData.element.productTitle}
            onChange={(e) => handleInputChange(e, orderData.id)}
            placeholder="Enter Product Title"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`count-${orderData.id}`}
          label="Count"
          className="my-3"
        >
          <Form.Control
            type="number"
            name="count"
            defaultValue={orderData.element.count}
            onChange={(e) => handleInputChange(e, orderData.id)}
            placeholder="Enter Count"
          />
        </FloatingLabel>
      </Container>
        )
      }
      return orderDetail;
    }
  
  );

  const element = (
    <Container className="d-flex justify-content-center" key={contentId}>
      <FloatingLabel
        controlId={`emailAddress-${contentId}`}
        label="Email address"
        className="my-3"
      >
        <Form.Control
          type="email"
          name="emailAddress"
          onChange={(e) => handleInputChange(e, contentId)}
          placeholder="Enter email address"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`productId-${contentId}`}
        label="Product ID"
        className="my-3"
      >
        <Form.Control
          type="text"
          name="productId"
          onChange={(e) => handleInputChange(e, contentId)}
          placeholder="Enter Product ID"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`productTitle-${contentId}`}
        label="Product Title"
        className="my-3"
      >
        <Form.Control
          type="text"
          name="productTitle"
          onChange={(e) => handleInputChange(e, contentId)}
          placeholder="Enter Product Title"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`count-${contentId}`}
        label="Count"
        className="my-3"
      >
        <Form.Control
          type="number"
          name="count"
          onChange={(e) => handleInputChange(e, contentId)}
          placeholder="Enter Count"
        />
      </FloatingLabel>
    </Container>
  );

  return { element, oldElement };
};

export const useDisplayOldInput = (
  handleInputChange: (event: MyChangeEvent, contentId: string) => void,
  contentId: string,
  OldOrderData: FormattedOrder
) =>{
  const dispatch = useAppDispatch();
  // const existsContent = useAppSelector((state:RootState)=> state.InputReducer.OrderContents);
  const oldElement = generateNewContent(handleInputChange, contentId, OldOrderData).oldElement;
  const newContent = oldElement.map((element)=>{
    return {
      id: element.contentId,
      element: element.element
    }
  })
  return ()=>{   
       newContent.forEach((newContent)=>{
        dispatch(addOrderDetailInput(newContent))
      })   
  } 
}

export const useIncreaseInput = (
  handleInputChange: (event: MyChangeEvent, contentId: string) => void,
  contentId: string,
  OldOrderData: FormattedOrder
) => {
  const dispatch = useAppDispatch();
  const newElement = generateNewContent(handleInputChange, contentId, OldOrderData).element;
  
  const newContent: OrderContentsInputP = {
    id: contentId,
    element: newElement
  };
  return () => {
    dispatch(addOrderDetailInput(newContent));
  };
};
export const useDecreaseInput = () => {
  const dispatch = useAppDispatch();
  return (id: string) => {
    dispatch(removeOrderDetailInput(id));
  };
};
