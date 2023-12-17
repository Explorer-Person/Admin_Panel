import { useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  Badge,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  Col,
  Row,
  Table,
} from "reactstrap";
import hubCSS from "/public/css/hub.module.css";
import { deleteContentUIProps } from "../../../interface/Interfaces";
import { Confirm } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../redux/stores/hooks";
import { filterOrderData } from "../../../redux/slices/OrderDataSlices";
import { RootState } from "../../../redux/stores/store";
import {
  displayDetails,
  interactDisplayDetails,
  manageConfirmBox,
} from "../../../redux/slices/PagesSlices";

const DeleteContentsUI = ({
  orders,
  deleteOrderContent,
}: deleteContentUIProps) => {
  const dispatch = useAppDispatch();

  const confirmBoxData = useAppSelector(
    (state: RootState) => state.PagesReducer.confirmBoxData
  );

  const filteredOrders = useAppSelector(
    (state: RootState) => state.OrderDataReducer.FilteredOrdersData
  );
  const correctDetailOrder = useAppSelector(
    (state: RootState) => state.PagesReducer.displayDetails
  );

  useEffect(() => {
    dispatch(displayDetails(orders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const handleDisplay = (id: string) => {
    dispatch(interactDisplayDetails(id));
  };
  const activateDisplay = (id: string) => {
    const correctedData = correctDetailOrder?.find(
      (element) => element.id === id
    );
    return correctedData;
  };

  const takeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = event.target.value;
    dispatch(filterOrderData(keywords));
  };

  const setConfirmBoxData = (id: string) => {
    dispatch(manageConfirmBox(id));
  };

  const deleteContent = (id: string) => {
    deleteOrderContent(id);
    setConfirmBoxData("");
  };

  return (
    <div>
      <Container className="input-group mt-5">
        <input
          type="search"
          className="form-control rounded border border-dark"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          name="keywords"
          onChange={(e) => takeKeywords(e)}
        />
        <button type="button" className="btn btn-outline-dark">
          search
        </button>
      </Container>

      {(filteredOrders?.length ?? 0 > 0 ? filteredOrders : orders)?.map(
        (order) => (
          <div key={order.root_id} className={`${hubCSS.pageContainer}`}>
            <Container className="my-3 px-5 text-center border border-muted shadow">
              <Container className="my-3 px-5 text-center border border-muted shadow">
                <div className={`mx-2 ${hubCSS.displayInfoBox}`}>
                  <div className={`${hubCSS.displayInfoBoxes}`}>
                    <Toast className="m-3">
                      <ToastHeader className="h5 w-100">
                        <p className="text-center">Tracking Code:</p>
                      </ToastHeader>
                      <ToastBody className="h6">
                        {order.tracking_code}
                      </ToastBody>
                    </Toast>
                  </div>
                  <div className={`${hubCSS.displayInfoBoxes}`}>
                    <Toast className="m-3">
                      <ToastHeader className="h5 w-100">
                        <p className="text-center">Email Address:</p>
                      </ToastHeader>
                      <ToastBody className="h6">
                        {order.email_address}
                      </ToastBody>
                    </Toast>
                  </div>
                  <div className={`${hubCSS.displayInfoBoxes}`}>
                    <Toast className="m-3">
                      <ToastHeader className="h5 w-100">
                        <p className="text-center">Status:</p>
                      </ToastHeader>
                      <ToastBody className="h6">{order.status}</ToastBody>
                    </Toast>
                  </div>
                </div>
              </Container>

              <Container
                className={`d-flex flex-wrap mt-1 justify-content-center ${
                  activateDisplay(order.root_id)?.displayInfo
                }`}
              >
                {order.shipment_details &&
                  order.shipment_details.map((shipment) => (
                    <Toast key={shipment.detail_id} className="m-3 w-100">
                      <ToastHeader className="text-center h5">
                        Shipment Details - {shipment.detail_id}
                      </ToastHeader>
                      <ToastBody>
                        <Row key={shipment.detail_id}>
                          <Row>
                            <Row className="m-2 border bg-white shadow">
                              <Row className="m-3">
                                <Col className="h6 text-muted">Carrier:</Col>
                                <Col className="h6">{shipment.carrier}</Col>
                              </Row>
                              <Row className="m-3">
                                <Col className="h6 text-muted">
                                  Carrier Tracking Code:
                                </Col>
                                <Col className="h6">
                                  {shipment.carrier_tracking_code}
                                </Col>
                              </Row>
                            </Row>

                            <Col className="m-3 border bg-white shadow">
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">Ship Date:</Col>
                                <Col className="h6">{shipment.ship_date}</Col>
                              </Row>
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">
                                  Estimate Delivery:
                                </Col>
                                <Col className="h6">
                                  {shipment.delivery_estimate}
                                </Col>
                              </Row>
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">Ship Date:</Col>
                                <Col className="h6">{shipment.ship_date}</Col>
                              </Row>
                            </Col>
                            <Col className="m-3 border bg-white shadow">
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">Name:</Col>
                                <Col className="h6">{shipment.name}</Col>
                              </Row>
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">
                                  Email Address:
                                </Col>
                                <Col className="h6">
                                  {shipment.email_address}
                                </Col>
                              </Row>
                              <Row className="m-3 w-100">
                                <Col className="h6 text-muted">Phone:</Col>
                                <Col className="h6">{shipment.phone}</Col>
                              </Row>
                            </Col>
                            <Col className="m-3 border bg-white shadow">
                              <Row className="m-3">
                                <Col className="h6 text-muted">Country:</Col>
                                <Col className="h6">{shipment.country}</Col>
                              </Row>
                              <Row className="m-3">
                                <Col className="h6 text-muted">City:</Col>
                                <Col className="h6">{shipment.city}</Col>
                              </Row>
                              <Row className="m-3">
                                <Col className="h6 text-muted">
                                  Address Line:
                                </Col>
                                <Col className="h6">
                                  {shipment.address_line_1}
                                </Col>
                              </Row>
                            </Col>
                            <Row className="m-2 border bg-white shadow">
                              <Row className="m-3">
                                <Col className="h6 text-muted">
                                  Address Line 1:
                                </Col>
                                <Col className="h6">
                                  {shipment.address_line_2}
                                </Col>
                              </Row>
                              <Row className="m-3">
                                <Col className="h6 text-muted">
                                  Address Line 2:
                                </Col>
                                <Col className="h6">
                                  {shipment.address_line_2}
                                </Col>
                              </Row>
                            </Row>
                          </Row>
                          <Row>
                            <Toast className="m-3 w-100">
                              <ToastHeader className="text-center h5">
                                Shipment Events
                              </ToastHeader>
                              <ToastBody className="w-100">
                                <Table className="w-100">
                                  <thead>
                                    <tr>
                                      <th>Date</th>
                                      <th>Time</th>
                                      <th>Location</th>
                                      <th>Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {shipment.shipment_events.map((events) => (
                                      <tr key={events.event_id}>
                                        <td>{events.event_date}</td>
                                        <td>{events.event_time}</td>
                                        <td>{events.location}</td>
                                        <td>{events.event_details}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </ToastBody>
                            </Toast>
                          </Row>
                        </Row>
                      </ToastBody>
                    </Toast>
                  ))}
              </Container>
              <Badge
                id={order.root_id}
                onClick={() => handleDisplay(order.root_id)}
                className={`${hubCSS.pointer}`}
              >
                {activateDisplay(order.root_id)?.arrowSide}
              </Badge>
            </Container>
            <div className="mb-5 text-center">
              <Button
                onClick={() => setConfirmBoxData(order.root_id)}
                className={"h-25 bg-danger"}
              >
                x
              </Button>
            </div>
            <Confirm
              open={confirmBoxData.status}
              content={`Are You Sure For Delete Content ?`}
              onCancel={() => setConfirmBoxData("")}
              onConfirm={() => deleteContent(confirmBoxData.id)}
              style={{
                maxHeight: "20%",
                textAlign: "center",
                margin: "20% 11%",
              }}
              className={`w-75`}
            />
          </div>
        )
      )}
    </div>
  );
};

export default DeleteContentsUI;
