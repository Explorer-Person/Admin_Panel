const ShipmentEvents = require("../../../models/orderModels/shipmentEvents");

const sequelize = require("../../myDB");



class QueryShipmentEvents {
  constructor(shipmentEvents) {
    this.shipmentEvents = shipmentEvents;
  }

  addOrder = async () => {
    const [result] = await sequelize.query(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders');"
    );
    const tableExists = result[0].exists;
    if (!tableExists) {
      await ShipmentEvents.sync({ force: false, alter: true });
      const newShipmentEvents = await ShipmentEvents.bulkCreate(
        this.shipmentEvents
      );
      return newShipmentEvents;
    } else {
      const newShipmentEvents = await ShipmentEvents.bulkCreate(
        this.shipmentEvents
      );
      return newShipmentEvents;
    }
  };

  static updateShipmentEvent = async(newShipmentEventData, status) =>{
     const branchIds = newShipmentEventData.map(event=> event.branch_id);
     const branchId = branchIds[0];
      if(!newShipmentEventData){
        throw new Error("there is no newShipmentEventData!");
      }

    const existedShipmentEvents = await ShipmentEvents.findAll({where: {branch_id: branchId}});
    
    const existedShipmentEventsIds = await existedShipmentEvents.map(event=> event.event_id);
    const newShipmentEventsIds = await newShipmentEventData.map(event=> event.event_id);

    const commonElements = await existedShipmentEventsIds.filter(element=> newShipmentEventsIds.includes(element));  

    const elementsWillUpdated = newShipmentEventData.filter(event=> commonElements.some(id=> event.event_id === id));
    const elementsWillAdded = newShipmentEventData.filter(event=> !commonElements.includes(event.event_id));
    const elementsWillDeleted = existedShipmentEvents.filter(event=> !commonElements.includes(event.event_id));
    const elementsWillDeletedIds = elementsWillDeleted.map(event=> event.event_id);

    const addShipmentEvent = await ShipmentEvents.bulkCreate(elementsWillAdded);
    const deleteShipmentEvent = await ShipmentEvents.destroy({where: {event_id: elementsWillDeletedIds}});
    const updatedShipmentEvent = await ShipmentEvents.bulkCreate(elementsWillUpdated, {updateOnDuplicate: status});

      return updatedShipmentEvent, addShipmentEvent, deleteShipmentEvent;
  }
}

module.exports = QueryShipmentEvents;
