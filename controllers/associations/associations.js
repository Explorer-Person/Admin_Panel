// const sequelize = require('sequelize');
const Orders = require("../../models/orderModels/order");
const ShipmentDetails = require("../../models/orderModels/shipmentDetail");
const ShipmentEvents = require("../../models/orderModels/shipmentEvents");
const OrderDetails = require("../../models/orderModels/orderDetail");

function clearAssociation(){
  Orders.associations = {};
  OrderDetails.associations = {};
  ShipmentDetails.associations = {};
  ShipmentEvents.associations = {};
}

exports.associations = async() => {
   
  await clearAssociation();

  Orders.hasMany(OrderDetails, {
    foreignKey: 'branch_id', // Foreign key in the OrderDetail model
    sourceKey: 'root_id',
    as: "order_details",
    onDelete: "CASCADE",
  });

  Orders.hasMany(ShipmentDetails, {
    foreignKey: "branch_id",
    sourceKey: "root_id",
    as: "shipment_details",
    onDelete: "CASCADE",
  });

  ShipmentDetails.hasMany(ShipmentEvents, {
    foreignKey: "event_detail_id",
    sourceKey: "detail_id",
    as: "shipment_events",
    onDelete: "CASCADE",
  });

};
