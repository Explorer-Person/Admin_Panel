import { OrderData } from "../interface/OrderData";


interface validatorResponse {
  status: boolean;
  message: string;
}


export const isValidOrder = (Order: OrderData): validatorResponse[] => {
  const validatorResponse: validatorResponse[] = [];

  const emptyOrderCount = Object.values(Order.order).filter(
    (value) => value === ""
  ).length;

  const emptyOrderDetailCount = Order.orderDetails.map(
    (detail) => {
      const counts = Object.values(detail.element).filter(
        (value) => value === ""
      );
      return counts.length;
    }
  );
  const moreEmptyInOrderDetails = emptyOrderDetailCount.some(
    (count) => count === Order.orderDetails.length
  );
  const singleEmptyInOrderDetails = emptyOrderDetailCount.some(
    (count) => count === 1
  );

  const emptyShipmentDetailCount = Order.shipmentContents.ShipmentDetails.map(
    (detail) => {
      const counts = Object.values(detail.element).filter(
        (value) => value === ""
      );
      return counts.length;
    }
  );
  const moreEmptyInShipmentDetails = emptyShipmentDetailCount.some(
    (count) => count === Order.shipmentContents.ShipmentDetails.length
  );
  const singleEmptyInShipmentDetails = emptyShipmentDetailCount.some(
    (count) => count === 1
  );


  const emptyShipmentEventCount = Order.shipmentContents.ShipmentEvents.map(
    (event) => {
      const counts = Object.values(event.element).filter(
        (value) => value === ""
      );
      return counts.length;
    }
  );
  const moreEmptyInShipmentEvents = emptyShipmentEventCount.some(
    (count) => count === Order.shipmentContents.ShipmentEvents.length
  );
  const singleEmptyInShipmentEvents = emptyShipmentEventCount.some(
    (count) => count === 1
  );

  if (emptyOrderCount > 1) {
    validatorResponse.push({ status: false, message: "Order empty!" });
  }
  else if (emptyOrderCount === 1) {
     Object.entries(Order.order).map((value) => {
      if (value[1] === "") {
         validatorResponse.push({
          status: false,
          message: `${value[0]} is empty!`,
        });
      }
    });
  }
   if (moreEmptyInOrderDetails === true || Order.orderDetails.length === 0) {
     validatorResponse.push({ status: false, message: "Order Details empty!" });
  }
  else if (moreEmptyInOrderDetails === false && singleEmptyInOrderDetails === true) {
     Order.orderDetails.map((orderDetail) => {
      return Object.entries(orderDetail.element).map((value) => {
        if (value[1] === "") {
           validatorResponse.push({
            status: false,
            message: `${value[0]} is empty!`,
          });
        }
      });
    });
  }
   if (
    moreEmptyInShipmentDetails === true ||
    Order.shipmentContents.ShipmentDetails.length === 0
  ) {
     validatorResponse.push({ status: false, message: "Shipment Details empty!"});
  }
  else if (
    moreEmptyInShipmentDetails === false &&
    singleEmptyInShipmentDetails === true
  ) {
     Order.shipmentContents.ShipmentDetails.map((shipmentDetail) => {
      return Object.entries(shipmentDetail.element).map((value) => {
        if (value[1] === '') {
           validatorResponse.push({
            status: false,
            message: `${value[0]} is empty!`,
          });
        }
      });
    });
  }
   if (
    moreEmptyInShipmentEvents === true ||
    Order.shipmentContents.ShipmentEvents.length === 0
  ) {
     validatorResponse.push({ status: false, message: "Shipment Events empty!" });
  }
  else if (
    moreEmptyInShipmentEvents === false &&
    singleEmptyInShipmentEvents === true
  ) {
     Order.shipmentContents.ShipmentEvents.map((shipmentEvent) => {
      return Object.entries(shipmentEvent.element).map((value) => {
        if (value[1] === "") {
          validatorResponse.push({
            status: false,
            message: `${value[0]} is empty!`,
          });       
        }
      });
    });
  }else if(singleEmptyInOrderDetails===false&&singleEmptyInShipmentDetails===false&&singleEmptyInShipmentEvents===false&&emptyOrderCount===0){
    validatorResponse.push({status: true, message:"confirmed"});
  }

  return validatorResponse;
};
