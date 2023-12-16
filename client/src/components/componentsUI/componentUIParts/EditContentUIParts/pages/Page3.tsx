import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
  useDisplayContent,
  useDisplayEvent,
  useIncreaseContent,
  useIncreaseEvent,
} from "../Actions/Page3.A";
import {
  ShipmentDetail,
  ShipmentEvent,
} from "../../../../../redux/stores/initialState";
import { addShipmentContentsData } from "../../../../../redux/slices/OrderDataSlices";
import { FormattedOrder } from "../../../../../interface/OrderData";
import {Confirm} from "semantic-ui-react";
import { manageConfirmBox } from "../../../../../redux/slices/PagesSlices";

export const Page3 = ({ display, handleSubmit }: DisplayP3) => {
  const dispatch = useAppDispatch();
  const contents = useAppSelector(
    (state: RootState) => state.InputReducer.ShipmentContents
  );

  const OldOrderData = useAppSelector(
    (state: RootState) => state.OrderDataReducer.OrderData
  );

  const eventsId = useAppSelector(
    (state: RootState) => state.OrderDataReducer.eventsId
  );
  const detailId = useAppSelector(
    (state: RootState) => state.OrderDataReducer.detailsId
  );

  const confirmBoxData = useAppSelector(
    (state: RootState) => state.PagesReducer.confirmBoxData
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
              [name]: value,
            },
          };
        }
        return detail;
      });
    });
  };
  const handleEventInputChange = (
    event: React.ChangeEvent<unknown>,
    eventsId: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    setShipmentEvents((prevData) => {
      const newData = prevData.map((event) => {
        if (eventsId === event.id) {
          return {
            ...event,
            element: {
              ...event.element,
              [name]: value,
            },
          };
        }
        return event;
      });
      return newData;
    });
  };

  const displayContent = useDisplayContent(
    handleContentInputChange,
    detailId,
    OldOrderData
  );

  const increaseContent = useIncreaseContent(
    handleContentInputChange,
    OldOrderData
  );

  const decreaseContent = useDecreaseContent();

  const displayEvent = useDisplayEvent(handleEventInputChange);

  const increaseEvent = useIncreaseEvent(handleEventInputChange);

  const decreaseEvent = useDecreaseEvent();

  const displayStateContent = () => {
    displayContent();
    setShipmentDetails(OldOrderData.shipmentDetails);
  };
  const displayStateEvent = (
    detailId: string,
    eventsId: string,
    OldOrderData: FormattedOrder
  ) => {
    displayEvent(detailId, eventsId, OldOrderData);
    setShipmentEvents(OldOrderData.shipmentEvents);
  };

  useEffect(() => {
    if(contents.length === 0){
      displayStateContent();
      displayStateEvent(detailId, eventsId, OldOrderData);
    }else{
      setShipmentEvents(OldOrderData.shipmentEvents);
      setShipmentDetails(OldOrderData.shipmentDetails);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OldOrderData]);

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
  const increaseStateEvent = (
    detailId: string,
    eventsId: string,
    OldOrderData: FormattedOrder
  ) => {
    increaseEvent(detailId, eventsId, OldOrderData);
    const ShipmentEvents: ShipmentEventsP = {
      id: eventsId,
      element: ShipmentEvent,
      detailId: detailId,
    };
    setShipmentEvents((prevEvents) => [...prevEvents, ShipmentEvents]);
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

  const setConfirmBoxData = (id: string) =>{
       dispatch(manageConfirmBox(id));
  }
  const confirmProcess = () =>{
        handleSubmit();
        setConfirmBoxData("");
  }

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
              onClick={() =>
                increaseStateEvent(content.id, eventsId, OldOrderData)
              }
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

      <Button onClick={()=>setConfirmBoxData("true")} className="mt-1 mx-2 bg-dark">
        Add Content
      </Button>
      <Confirm
        open={confirmBoxData.status}
        content="Are You Sure For Update Content"
        onCancel={() => setConfirmBoxData("")}
        onConfirm={confirmProcess}
        style={{maxHeight: "20%", textAlign: "center", margin: "20% 35%"}}
        className="w-25"
      />
    </Container>
  );
};
