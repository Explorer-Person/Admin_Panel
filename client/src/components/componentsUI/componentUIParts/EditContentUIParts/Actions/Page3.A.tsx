import {
  addShipmentInput,
  removeShipmentInput,
  addShipmentEventInput,
  removeShipmentEventInput,
} from "../../../../../redux/slices/InputSlices";
import {
  ShipmentContentsInputP,
  ShipmentEventsInputP,
} from "../../../../../interface/Interfaces";
import { FloatingLabel, Form, Container } from "react-bootstrap";
import {
  useAppDispatch, useAppSelector,
} from "../../../../../redux/stores/hooks";
import { v4 as uuidv4 } from "uuid";
import {
  generatedDetailId,
  generatedEventId,
} from "../../../../../redux/slices/OrderDataSlices";
import { FormattedOrder } from "../../../../../interface/OrderData";
import { RootState } from "../../../../../redux/stores/store";


type MyChangeEvent = React.ChangeEvent<unknown>;
interface Dispatch {
  (action: unknown): void;
}

export const generateNewContent = (
  handleContentInputChange: (event: MyChangeEvent, detailId: string) => void,
  detailId: string,
  OldOrderData: FormattedOrder
) => {
  const oldShipmentElementDetails = OldOrderData.shipmentDetails.map(
    (orderData) => {
      return {
        id: orderData.id,
        element: (
        <Container key={orderData.id} className="d-flex">
          <Container>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Carrier Tracking Code"
              className="my-3"
            >
              <Form.Control
                name="carrierTrackingCode"
                type="text"
                defaultValue={orderData.element.carrierTrackingCode}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Enter Carrier Tracking Code"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Ship Date"
              className="my-3"
            >
              <Form.Control
                type="date"
                name="shipDate"
                defaultValue={orderData.element.shipDate}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Select Ship Date"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Country"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="country"
                defaultValue={orderData.element.country}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Country"
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Address Line 1"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="addressLine1"
                defaultValue={orderData.element.addressLine1}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Enter Address Line 1"
                required
              />
            </FloatingLabel>
            
          </Container>
          <Container>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Carrier"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="carrier"
                defaultValue={orderData.element.carrier}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Enter Carrier"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Delivery Estimate"
              className="my-3"
            >
              <Form.Control
                type="date"
                name="deliveryEstimate"
                defaultValue={orderData.element.deliveryEstimate}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                placeholder="Select Delivery Estimate"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="City"
              className="my-3"
            >
              <Form.Control
                name="city"
                defaultValue={orderData.element.city}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                type="text"
                placeholder="City"
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Address Line 2"
              className="my-3"
            >
              <Form.Control
                name="addressLine2"
                defaultValue={orderData.element.addressLine2}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                type="text"
                placeholder="Enter Address Line 2"
                required
              />
            </FloatingLabel>
          
            <FloatingLabel
              controlId={`carrierTrackingCode-${orderData.id}`}
              label="Postal Code"
              className="my-3"
            >
              <Form.Control
                name="postalCode"
                defaultValue={orderData.element.postalCode}
                onChange={(e) =>
                  handleContentInputChange(e, orderData.id)
                }
                type="text"
                placeholder="Postal Code"
                required
              />
            </FloatingLabel>
          </Container>
        </Container>
      ),
    }
    }
  );
  const shipmentElementDetails = (
    <Container key={detailId} className="d-flex">
      <Container>
        <FloatingLabel
          controlId={`carrierTrackingCode-${detailId}`}
          label="Carrier Tracking Code"
          className="my-3"
        >
          <Form.Control
            name="carrierTrackingCode"
            type="text"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Enter Carrier Tracking Code"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`shipDate-${detailId}`}
          label="Ship Date"
          className="my-3"
        >
          <Form.Control
            type="date"
            name="shipDate"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Select Ship Date"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`country-${detailId}`}
          label="Country"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="country"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Country"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`addressLine1-${detailId}`}
          label="Address Line 1"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="addressLine1"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Enter Address Line 1"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`emailAddress-${detailId}`}
          label="Email"
          className="my-3"
        >
          <Form.Control
            type="email"
            name="emailAddress"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Email"
            required
          />
        </FloatingLabel>
      </Container>
      <Container>
        <FloatingLabel
          controlId={`carrier-${detailId}`}
          label="Carrier"
          className="my-3"
        >
          <Form.Control
            type="text"
            name="carrier"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Enter Carrier"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`deliveryEstimate-${detailId}`}
          label="Delivery Estimate"
          className="my-3"
        >
          <Form.Control
            type="date"
            name="deliveryEstimate"
            onChange={(e) => handleContentInputChange(e, detailId)}
            placeholder="Select Delivery Estimate"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`city-${detailId}`}
          label="City"
          className="my-3"
        >
          <Form.Control
            name="city"
            onChange={(e) => handleContentInputChange(e, detailId)}
            type="text"
            placeholder="City"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId={`addressLine2-${detailId}`}
          label="Address Line 2"
          className="my-3"
        >
          <Form.Control
            name="addressLine2"
            onChange={(e) => handleContentInputChange(e, detailId)}
            type="text"
            placeholder="Enter Address Line 2"
            required
          />
        </FloatingLabel>
    
        <FloatingLabel
          controlId={`postalCode-${detailId}`}
          label="Postal Code"
          className="my-3"
        >
          <Form.Control
            name="postalCode"
            onChange={(e) => handleContentInputChange(e, detailId)}
            type="text"
            placeholder="Postal Code"
            required
          />
        </FloatingLabel>
      </Container>
    </Container>
  );

  return { shipmentElementDetails, oldShipmentElementDetails };
};

const generateNewEvent = (
  handleEventInputChange: (
    event: MyChangeEvent,
    eventsId: string,
    detailId: string
  ) => void,
  detailId: string,
  eventsId: string,
  dispatch: Dispatch,
  OldOrderData: FormattedOrder,
) => {
  dispatch(generatedEventId());
  const oldShipmentEventElement = OldOrderData.shipmentEvents.map(orderData=>{
    return {
      id: orderData.id,
      detailId: orderData.detailId,
      element: (
        <Container key={orderData.id} className="d-flex justify-content-center">
          <FloatingLabel
            controlId={`eventDate-${orderData.id}`}
            label="Date"
            className="my-3"
          >
            <Form.Control
              type="date"
              name="eventDate"
              defaultValue={orderData.element.eventDate}
              onChange={(e) => handleEventInputChange(e, orderData.id, orderData.detailId)}
              placeholder="Select Event Date"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={`eventDate-${orderData.id}`}
            label="Time"
            className="my-3"
          >
            <Form.Control
              type="time"
              name="eventTime"
              defaultValue={orderData.element.eventTime}
              onChange={(e) => handleEventInputChange(e, orderData.id, orderData.detailId)}
              placeholder="Select Event Time"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={`eventDate-${orderData.id}`}
            label="Location"
            className="my-3"
          >
            <Form.Control
              type="text"
              name="location"
              defaultValue={orderData.element.location}
              onChange={(e) => handleEventInputChange(e, orderData.id, orderData.detailId)}
              placeholder="Enter Event Location"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId={`eventDate-${orderData.id}`}
            label="Event Details"
            className="my-3"
          >
            <Form.Control
              as="textarea"
              name="eventDetails"
              defaultValue={orderData.element.eventDetails}
              onChange={(e) => handleEventInputChange(e, orderData.id, orderData.detailId)}
              placeholder="Enter Event Details"
            />
          </FloatingLabel>
        </Container>
      )
    }
  });
  const shipmentEventElement = (
    <Container key={eventsId} className="d-flex justify-content-center">
      <FloatingLabel
        controlId={`eventDate-${eventsId}`}
        label="Date"
        className="my-3"
      >
        <Form.Control
          type="date"
          name="eventDate"
          onChange={(e) => handleEventInputChange(e, eventsId, detailId)}
          placeholder="Select Event Date"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`eventTime-${eventsId}`}
        label="Time"
        className="my-3"
      >
        <Form.Control
          type="time"
          name="eventTime"
          onChange={(e) => handleEventInputChange(e, eventsId, detailId)}
          placeholder="Select Event Time"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`eventLocation-${eventsId}`}
        label="Location"
        className="my-3"
      >
        <Form.Control
          type="text"
          name="location"
          onChange={(e) => handleEventInputChange(e, eventsId, detailId)}
          placeholder="Enter Event Location"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={`eventDetails-${eventsId}`}
        label="Event Details"
        className="my-3"
      >
        <Form.Control
          as="textarea"
          name="eventDetails"
          onChange={(e) => handleEventInputChange(e, eventsId, detailId)}
          placeholder="Enter Event Details"
        />
      </FloatingLabel>
    </Container>
  );
  
  return {shipmentEventElement, oldShipmentEventElement};
};

export function useDisplayContent(
  handleContentInputChange: (event: MyChangeEvent, detailId: string) => void,
  detailId: string,
  OldOrderData: FormattedOrder
) {
  const dispatch = useAppDispatch();
  const oldElement = generateNewContent(
    handleContentInputChange,
    detailId,
    OldOrderData
  ).oldShipmentElementDetails;
  
  const newContent = oldElement.map(element=>{
    return {
      id: element.id,
      element: element.element,
      events: [],
    }
  });
  return ()=>{
    newContent.forEach((content)=>{
      dispatch(addShipmentInput(content));
    })
  }
  
}

export function useIncreaseContent(
  handleContentInputChange: (event: MyChangeEvent, detailId: string) => void,
  OldOrderData: FormattedOrder
) {
  const dispatch = useAppDispatch();
  const detailId = uuidv4();

  const element = generateNewContent(
    handleContentInputChange,
    detailId,
    OldOrderData
  ).shipmentElementDetails;

  const newContent: ShipmentContentsInputP = {
    id: detailId,
    element: element,
    events: [],
  };

  return () => {
    dispatch(generatedDetailId(detailId));
    dispatch(addShipmentInput(newContent));
  };
}

export function useDecreaseContent() {
  const dispatch = useAppDispatch();
  return (contentId: string) => {
    dispatch(removeShipmentInput(contentId));
  };
}

export function useDisplayEvent(
  handleEventInputChange: (
    event: MyChangeEvent,
    eventsId: string,
    detailId: string
  ) => void,
){
     const dispatch = useAppDispatch();
     return (detailId: string, eventsId: string, OldOrderData: FormattedOrder)=>{
      const oldElement = generateNewEvent(
        handleEventInputChange,
        detailId,
        eventsId,
        dispatch,
        OldOrderData
      ).oldShipmentEventElement;
      const newEvent = oldElement.map(element=>{
        return {
          eventsId: element.id,
          element: element.element,
          detailId: element.detailId,
        }
      });

     return newEvent.forEach(event=>{
        dispatch(addShipmentEventInput(event));
      })
     }
}

export function useIncreaseEvent(
  handleEventInputChange: (
    event: MyChangeEvent,
    eventsId: string,
    detailId: string
  ) => void,
) {
  const dispatch = useAppDispatch();
  
  const eventId = useAppSelector((state:RootState)=> state.OrderDataReducer.eventsId);
  return (detailId: string, eventsId: string, OldOrderData: FormattedOrder) => {
    const eventElement = generateNewEvent(
      handleEventInputChange,
      detailId,
      eventsId,
      dispatch,
      OldOrderData
    ).shipmentEventElement;
  
    const newEvent: ShipmentEventsInputP = {
      eventsId: eventId,
      element: eventElement,
      detailId: detailId,
    };
    
    dispatch(addShipmentEventInput(newEvent));
  };
}

export function useDecreaseEvent() {
  const dispatch = useAppDispatch();
  return (eventsId: string) => {
    dispatch(removeShipmentEventInput(eventsId));
  };
}
