const ShipmentDetails = require("../../../models/orderModels/shipmentDetail");
const sequelize = require("../../myDB");
const { QueryTypes } = require("sequelize");


class QueryShipments {
  constructor(shipmentDetails) {
    this.shipmentDetails = shipmentDetails;
  }

  addOrder = async () => {
    const result = await sequelize.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name= :tableName);",
    {
      replacements: { tableName: 'shipment_details' },
      type: QueryTypes.SELECT,
    }
    );
    const tableExists = result[0].exists;
    if (!tableExists) {
      await ShipmentDetails.sync({ force: false, alter: true });
      const newShipmentDetails = await ShipmentDetails.bulkCreate(
        this.shipmentDetails
      );
      return newShipmentDetails;
    } else {
      const newShipmentDetails = await ShipmentDetails.bulkCreate(
        this.shipmentDetails
      );
      return newShipmentDetails;
    }
  };

  static async updateShipmentDetails(newShipmentDetailData, status) {
    const branchIds = await newShipmentDetailData.map(detail=> detail.branch_id);
    const branchId = await branchIds[0];
    if(!newShipmentDetailData){
      throw new Error("there is no newShipmentDetailData!");
    }
    const existedShipmentDetails = await ShipmentDetails.findAll({where: {branch_id: branchId}});
    
    const existedShipmentDetailsIds = await existedShipmentDetails.map(detail=> detail.detail_id);
    const newShipmentDetailsIds = await newShipmentDetailData.map(detail=> detail.detail_id);

    const commonElements = await existedShipmentDetailsIds.filter(element=> newShipmentDetailsIds.includes(element));  

    const elementsWillUpdated = newShipmentDetailData.filter(detail=> commonElements.some(id=> detail.detail_id === id));
    const elementsWillAdded = newShipmentDetailData.filter(detail=> !commonElements.includes(detail.detail_id));
    const elementsWillDeleted = existedShipmentDetails.filter(detail=> !commonElements.includes(detail.detail_id));
    const elementsWillDeletedIds = elementsWillDeleted.map(detail=> detail.detail_id);


    const addShipment = await ShipmentDetails.bulkCreate(elementsWillAdded);
    const deleteShipment = await ShipmentDetails.destroy({where: {detail_id: elementsWillDeletedIds}});
    const updateShipment = await ShipmentDetails.bulkCreate(elementsWillUpdated, {updateOnDuplicate: status});

    return updateShipment, addShipment, deleteShipment;
  }
}

module.exports = QueryShipments;
