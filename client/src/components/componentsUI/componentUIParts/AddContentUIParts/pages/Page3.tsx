import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import DOMPurify from "dompurify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/stores/hooks";
import { Button } from "reactstrap";
import {
  DisplayP3,
  ShipmentDetailsP,
  ShipmentEventsP,
} from "../../../../../interface/Interfaces";
import { RootState } from "../../../../../redux/stores/store";
import {
  useDecreaseContent,
  useDecreaseEvent,
  useIncreaseContent,
  useIncreaseEvent,
} from "../Actions/Page3.A";
import {
  ShipmentDetail,
  ShipmentEvent,
} from "../../../../../redux/stores/initialState";
import { addShipmentContentsData } from "../../../../../redux/slices/OrderDataSlices";
// import { v4 as uuidv4 } from "uuid";

export const Page3 = ({ display, handleSubmit }: DisplayP3) => {
  const dispatch = useAppDispatch();
  const contents = useAppSelector(
    (state: RootState) => state.InputReducer.ShipmentContents
  );

  const eventsId = useAppSelector(
    (state: RootState) => state.OrderDataReducer.eventsId
  );
  const detailId = useAppSelector(
    (state: RootState) => state.OrderDataReducer.detailsId
  );

  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetailsP[]>(
    []
  );
  const [shipmentEvents, setShipmentEvents] = useState<ShipmentEventsP[]>([]);

  const handleContentInputChange = (
    event: React.ChangeEvent<unknown>,
    detailId: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setShipmentDetails((prevData) => {
      return prevData.map((detail) => {
        if (detailId === detail.id) {
          return {
            ...detail,
            element: {
              ...detail.element,
              [name]: DOMPurify.sanitize(value.trim()),
            },
          };
        }
        return detail;
      });
    });
  };
  const handleEventInputChange = (
    event: React.ChangeEvent<unknown>,
    eventsId: string,
    detailId: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    setShipmentEvents((prevData) => {
      const newData = prevData.map((event) => {
        if (detailId === event.detailId && event.id === eventsId) {
          return {
            ...event,
            element: {
              ...event.element,
              [name]: DOMPurify.sanitize(value.trim()),
            },
          };
        }
        return event;
      });
      return newData;
    });
  };

  const increaseContent = useIncreaseContent(handleContentInputChange);

  const decreaseContent = useDecreaseContent();

  const increaseEvent = useIncreaseEvent(handleEventInputChange);

  const decreaseEvent = useDecreaseEvent();

  const increaseStateContent = () => {
    increaseContent();
  };

  useEffect(() => {
    if (detailId) {

      const ShipmentDetails: ShipmentDetailsP = {
        id: detailId,
        element: ShipmentDetail,
      };

      setShipmentDetails((prevDetails) => [...prevDetails, ShipmentDetails]);
    } 
  }, [detailId]);

  const decreaseStateContent = (detailId: string) => {
    decreaseContent(detailId);
    setShipmentDetails((prevData) => {
      return prevData.filter((detail) => {
        return detail.id !== detailId;
      });
    });
    setShipmentEvents((prevData) => {
      return prevData.filter((event) => {
        return detailId !== event.detailId;
      });
    });
  };
  const increaseStateEvent = (detailId: string) => {
    increaseEvent(detailId);
    const ShipmentEvents: ShipmentEventsP = {
      id: eventsId,
      element: ShipmentEvent,
      detailId: detailId,
    };

    setShipmentEvents([...shipmentEvents, ShipmentEvents]);
  };
  const decreaseStateEvent = (eventsId: string) => {
    decreaseEvent(eventsId);
    setShipmentEvents((prevData) => {
      return prevData.filter((event) => {
        return eventsId !== event.id;
      });
    });
  };

  useEffect(() => {
    dispatch(
      addShipmentContentsData({
        ShipmentDetails: shipmentDetails,
        ShipmentEvents: shipmentEvents,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentDetails, shipmentEvents]);

  return (
    <Container id="3" className={display.display3}>
      <h1>Shipment Details</h1>
      {contents.map((content) => (
        <Container
          id={`${content.id}`}
          key={content.id}
          className="d-block border border-dark my-3"
        >
          <Container>{content.element}</Container>
          <Container key={content.id}>
            {content.events.map((event) => (
              <Container className="d-flex" key={event.eventsId}>
                <Container key={event.eventsId}>{event.element}</Container>{" "}
                <Button
                  className="h-25 mt-4 mx-2 bg-danger"
                  onClick={(e) => decreaseStateEvent(e.currentTarget.value)}
                  value={event.eventsId}
                >
                  -
                </Button>
              </Container>
            ))}
            <Button
              className="h-25 mt-4 mx-2 bg-primary"
              name={`${content.id}`}
              onClick={() => increaseStateEvent(content.id)}
            >
              Add Shipment Event
            </Button>
          </Container>

          <Button
            className="my-2 bg-danger"
            onClick={(e) => decreaseStateContent(e.currentTarget.value)}
            value={content.id}
          >
            Delete Info
          </Button>
        </Container>
      ))}
      <Button className="mt-1 mx-2 bg-primary" onClick={increaseStateContent}>
        Add Shipment Info
      </Button>

      <Button onClick={handleSubmit} className="mt-1 mx-2 bg-dark">
        Add Content
      </Button>
    </Container>
  );
};
