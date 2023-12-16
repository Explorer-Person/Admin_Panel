import { FloatingLabel, Form, Container } from "react-bootstrap";
import { useAppDispatch } from "../../../../../redux/stores/hooks";
import { addOrderDetailInput, removeOrderDetailInput } from "../../../../../redux/slices/InputSlices";
import { OrderContentsInputP } from "../../../../../interface/Interfaces";
import hubCSS from "/public/css/hub.module.css"

type MyChangeEvent = React.ChangeEvent<unknown>;

const generateNewContent = (handleInputChange: (event: MyChangeEvent, contentId: string) => void, contentId: string) => {
    const element = (
      <Container  className={`${hubCSS.pageContainer}`} key={contentId}>
        <FloatingLabel
          controlId={`productId-${contentId}`}
          label="Product ID"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="productId"
            onChange={(e)=>handleInputChange(e, contentId)}
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
            onChange={(e)=>handleInputChange(e, contentId)}
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
            onChange={(e)=>handleInputChange(e, contentId)}
            placeholder="Enter Count"
          />
        </FloatingLabel>
      </Container>
    );
    const newContent: OrderContentsInputP = {
      id: contentId,
      element: element,
    };
    return newContent;
  };

  export const useIncreaseInput = (handleInputChange: (event: MyChangeEvent, contentId: string) => void, contentId: string) => {
    const dispatch = useAppDispatch();
    const newContent = generateNewContent(handleInputChange, contentId);
    return() =>{
        dispatch(addOrderDetailInput(newContent));
    }
  };
  export const useDecreaseInput = () => {
    const dispatch = useAppDispatch();
    return(id: string) =>{
        dispatch(removeOrderDetailInput(id));  
    }
  };