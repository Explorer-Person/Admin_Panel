import { FloatingLabel, Form, Container } from "react-bootstrap";
import DOMPurify from "dompurify";
import { DisplayP } from "../../../../../interface/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { initialOrder } from "../../../../../redux/stores/initialState";
import { useAppDispatch } from "../../../../../redux/stores/hooks";
import { addOrderData } from "../../../../../redux/slices/OrderDataSlices";
import { Button } from "reactstrap";

export const Page1 = ({ display }: DisplayP) => {
  const dispatch = useAppDispatch();
  const [uuid, setUUID] = useState(uuidv4);
  const [textButtonUUID, setTextButtonUUID] = useState(
    `New Tracking Code: ${uuid}`
  );
  const createUUID = () => {
    const newUUID = uuidv4();
    setUUID(`${newUUID}`);
  };
  const copyUUID = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    navigator.clipboard.writeText(uuid);
    setTextButtonUUID("Copied To Clipboard");
    setTimeout(() => {
      setTextButtonUUID(`New Tracking Code: ${uuid}`);
      createUUID();
    }, 1000);
  };

  const [orderData, setOrderData] = useState(initialOrder);

  const handleInputChange = async (event: React.ChangeEvent<unknown>) => {
    const { name, value } = event.target as HTMLInputElement;

    setOrderData((prevData) => ({
      ...prevData,
      [name]: DOMPurify.sanitize(value.trim()),
    }));
  };
  useEffect(() => {
    dispatch(addOrderData(orderData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleInputChange]);

  return (
    <Container
      style={{ width: "800px" }}
      className={`fade-in ${display.display1}`}
      id="1"
    >
      <h1>Order Details</h1>
      <Container className="d-flex">
        <Container>
          <FloatingLabel
            controlId="amazonOrderId"
            label="Amazon Order ID"
            className="my-3"
          >
            <Form.Control
              type="text"
              name="amazonOrderId"
              onChange={handleInputChange}
              placeholder="Enter Amazon Order ID"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="orderDate"
            label="Order Date"
            className="my-3"
          >
            <Form.Control
              type="date"
              name="orderDate"
              onChange={handleInputChange}
              placeholder="Select Order Date"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="dateSubmitted"
            label="Date Submitted"
            className="my-3"
          >
            <Form.Control
              type="date"
              name="dateSubmitted"
              onChange={handleInputChange}
              placeholder="Select Date Submitted"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="salesChannel"
            label="Sales Channel"
            className="my-3"
          >
            <Form.Control
              type="text"
              name="salesChannel"
              onChange={handleInputChange}
              placeholder="Enter Sales Channel"
            />
          </FloatingLabel>
          <FloatingLabel controlId="status" label="Status" className="my-3">
            <Form.Control
              type="text"
              name="status"
              onChange={handleInputChange}
              placeholder="Enter Status"
            />
          </FloatingLabel>
        </Container>
        <Container>
          <FloatingLabel
            controlId="trackingCode"
            label="Tracking Code"
            className="my-3"
          >
            <Form.Control
              name="trackingCode"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter Tracking Code"
            />
          </FloatingLabel>
          <Button
            onClick={copyUUID}
            style={{ height: "15%" }}
            className="bg-dark text-light w-100 custom-height"
          >
            <h6>{textButtonUUID}</h6>
          </Button>
          <FloatingLabel
            controlId="amazonTrackingNumber"
            label="Amazon Tracking Code"
            className="my-3"
          >
            <Form.Control
              name="amazonTrackingCode"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter Amazon Tracking Number"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="shippingService"
            label="Shipping Service"
            className="my-3"
          >
            <Form.Control
              type="text"
              name="shippingService"
              onChange={handleInputChange}
              placeholder="Enter Shipping Service"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="packingSlipComments"
            label="Packing Slip Comments"
            className="my-3"
          >
            <Form.Control
              name="packingSlipComments"
              onChange={handleInputChange}
              as="textarea"
              placeholder="Enter Packing Slip Comments"
            />
          </FloatingLabel>
        </Container>
      </Container>
      <h1>Customer Details</h1>
      <Container className="d-flex mt-1 justify-content-center">
        <FloatingLabel
          controlId={`emailAddress`}
          label="Email address"
          className="my-3 mx-2"
        >
          <Form.Control
            type="email"
            name="emailAddress"
            onChange={handleInputChange}
            placeholder="Enter Customer Email address"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`phone`}
          label="Phone"
          className="my-3 mx-2"
        >
          <Form.Control
            type="text"
            name="phone"
            onChange={handleInputChange}
            placeholder="Enter Customer Phone Number"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`name`}
          label="Name"
          className="my-3 mx-2"
        >
          <Form.Control
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder="Enter Customer Name"
          />
        </FloatingLabel>
      </Container>
    </Container>
  );
};
