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
import { useAppDispatch, useAppSelector } from "../../../../../redux/stores/hooks";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../../../redux/stores/store";
import { generatedDetailId, generatedEventId } from "../../../../../redux/slices/OrderDataSlices";
import hubCSS from "/public/css/hub.module.css"

type MyChangeEvent = React.ChangeEvent<unknown>;
interface Dispatch {
  (action: unknown): void;
}

export const generateNewContent = (
  handleContentInputChange: (event: MyChangeEvent, detailId: string) => void,
  detailId: string
) => {
  const shipmentElementDetails = (
    <Container key={detailId} className={`${hubCSS.pageContainer}`}>
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
  const newContent: ShipmentContentsInputP = {
    id: detailId,
    element: shipmentElementDetails,
    events: [],
  };
  return newContent;
};

const generateNewEvent = (
  handleEventInputChange: (
    event: MyChangeEvent,
    eventsId: string,
    detailId: string
  ) => void,
  detailId: string,
  eventsId: string,
  dispatch: Dispatch
) => {
  dispatch(generatedEventId());
  const shipmentElementEvents = (
    <Container key={eventsId} className={`${hubCSS.pageContainer}`}>
      
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
  const newEvent: ShipmentEventsInputP = {
    eventsId: eventsId,
    element: shipmentElementEvents,
    detailId: detailId,
  };
  return newEvent;
};

export function useIncreaseContent(
  handleContentInputChange: (event: MyChangeEvent, detailId: string) => void,
) {
  const dispatch = useAppDispatch();
  const detailId = uuidv4();

  return () => {
    const newContent = generateNewContent(
      handleContentInputChange,
      detailId
    );
    dispatch(generatedDetailId(detailId))
    dispatch(addShipmentInput(newContent));
  };
}

export function useDecreaseContent() {
  const dispatch = useAppDispatch();
  return (contentId: string) => {
    dispatch(removeShipmentInput(contentId));
  };
}

export function useIncreaseEvent(
  handleEventInputChange: (
    event: MyChangeEvent,
    eventsId: string,
    detailId: string
  ) => void,
) {
  const dispatch = useAppDispatch();
  const eventsId = useAppSelector((state:RootState)=> state.OrderDataReducer.eventsId);
  // const detailId = useAppSelector((state:RootState)=> state.OrderDataReducer.detailsId);
  return (detailId: string) => {
    const newEvent = generateNewEvent(
      handleEventInputChange,
      detailId,
      eventsId,
      dispatch
    );
    dispatch(addShipmentEventInput(newEvent));
  };
}

export function useDecreaseEvent() {
  const dispatch = useAppDispatch();
  return (eventsId: string) => {
    dispatch(removeShipmentEventInput(eventsId));
  };
}
