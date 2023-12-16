import { Container, Row, Col, Table } from "reactstrap";
import { ContentDetailData } from "../../../interface/OrderData";
import hubCSS from "/public/css/hub.module.css";

interface Data {
  contentDetailData: ContentDetailData;
}

const ContentDetailUI = ({ contentDetailData }: Data) => {
  return (
    <div>
      <Container
        style={{ marginTop: "3%", marginBottom: "20%" }}
        className="w-100"
      >
        <Container className="w-100 border border-muted shadow">
          <Row>
            <Container>
              <h2 className="my-3 text-center">Order Details</h2>
            </Container>
          </Row>
          <Row>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Tracking Code</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.trackingCode}
                  </h6>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Amazon Order ID</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.amazonOrderId}
                  </h6>
                </Row>
              </Container>
            </Col>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Amazon Tracking Code</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.amazonTrackingCode}
                  </h6>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Sales Channel</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.salesChannel}
                  </h6>
                </Row>
              </Container>
            </Col>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Shipping Service</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.shippingService}
                  </h6>
                </Row>
              </Container>
            </Col>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Packing Slip Comments</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.packingSlipComments}
                  </h6>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Order Date</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.orderDate}
                  </h6>
                </Row>
              </Container>
            </Col>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Status</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.status}
                  </h6>
                </Row>
              </Container>
            </Col>
            <Col className="m-2">
              <Container className="border border-muted shadow">
                <Row className="border-bottom border-dark">
                  <h5 className="text-center my-2">Date Submitted</h5>
                </Row>
                <Row className="my-4">
                  <h6 className="text-center">
                    {contentDetailData.order.dateSubmitted}
                  </h6>
                </Row>
              </Container>
            </Col>
          </Row>
          <Container className="my-4 border-bottom border-top border-dark text-center">
            <Row>
              <Container>
                <h3 className="my-3">Products</h3>
              </Container>
            </Row>

            <Row>
              <Container className="my-2">
                <Container className="border border-muted shadow d-flex justify-content-center">
                  <Table className="w-75">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Title</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentDetailData.orderDetails.map((product) => (
                        <tr key={product.id}>
                          <th scope="row">{product.element.productId}</th>
                          <td>{product.element.productTitle}</td>
                          <td>{product.element.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Container>
            </Row>
          </Container>
          {contentDetailData.shipmentDetails.map((shipment) => (
            <Container
              key={shipment.id}
              className="my-4 border-bottom border-dark text-center justify-content-center w-100"
            >
              <Row>
                <Container>
                  <h3 className="my-3">
                    Shipment Detail - {shipment.element.carrier}
                  </h3>
                </Container>
              </Row>

              <Row>
                <Row>
                  <Container className={`${hubCSS.pageContainer}`}>
                    <Container className="m-3 border border-muted shadow">
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Carrier Tracking Code</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.carrierTrackingCode}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Name</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.name}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Phone</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.phone}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Country</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.country}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Address Line 1</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.addressLine1}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Ship Date</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.shipDate}</Col>
                        </Container>
                      </Row>
                    </Container>

                    <Container className="m-3 border border-muted shadow">
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2">
                            <h4>Carrier</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.carrier}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Email</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.emailAddress}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Postal Code</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.postalCode}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>City</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.city}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Address Line 2</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.addressLine2}</Col>
                        </Container>
                      </Row>
                      <Row className="m-3">
                        <Container className="d-flex">
                          <Col xs="2" className="h5">
                            <h4>Delivery Estimate</h4>
                          </Col>
                          <Col xs="1">:</Col>
                          <Col>{shipment.element.deliveryEstimate}</Col>
                        </Container>
                      </Row>
                    </Container>
                  </Container>
                </Row>

                <Container>
                  <Row className="mt-4">
                    <Container>
                      <h3 className="my-3">Shipment Events</h3>
                    </Container>
                  </Row>

                  <Row>
                    <Container className="my-2">
                      <Container className="border border-muted shadow d-flex justify-content-center">
                        <Table>
                          <thead>
                            <tr>
                              <th>Event Date</th>
                              <th>Event Time</th>
                              <th>Location</th>
                              <th>Event Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {shipment.element.shipmentEvents.map((event) => (
                              <tr key={event.id}>
                                <th scope="row">{event.element.eventDate}</th>
                                <th>{event.element.eventTime}</th>
                                <td>{event.element.location}</td>
                                <td>{event.element.eventDetails}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Container>
                    </Container>
                  </Row>
                </Container>
              </Row>
            </Container>
          ))}
        </Container>
      </Container>
    </div>
  );
};

export default ContentDetailUI;
