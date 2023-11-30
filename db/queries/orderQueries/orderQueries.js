const Order = require("../../../models/orderModels/order");
const OrderDetails = require("../../../models/orderModels/orderDetail");
const ShipmentDetails = require("../../../models/orderModels/shipmentDetail");
const ShipmentEvents = require("../../../models/orderModels/shipmentEvents");
const sequelize = require("../../myDB");




class QueryOrder {
  constructor(order) {
    this.order = order;
  }

  addOrder = async () => {
    const [result] = await sequelize.query(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders');"
    );
    const tableExists = result[0].exists;
    if (!tableExists) {
      await Order.sync({ force: false, alter: true });
      const newOrder = await Order.create(this.order);
      return newOrder;
    } else {
      const newOrder = await Order.create(this.order);
      return newOrder;
    }
  };

  getOrder = async () => {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderDetails,
            as: "order_details",
          },
          {
            model: ShipmentDetails,
            as: "shipment_details", // Use the correct alias here
            include: [
              {
                model: ShipmentEvents,
                as: "shipment_events",
              },
            ],
          },
        ],
        order: [
          [ShipmentDetails, ShipmentEvents, "event_date", "ASC"],
          [ShipmentDetails, ShipmentEvents, "event_time", "ASC"],
        ],
      });
      return orders;
    } catch (error) {
        return false
    }
  };

  static deleteOrder = async (rootId) => {
    if (rootId) {
      const deletedOrder = await Order.destroy({
        where: {
          root_id: rootId,
        },
      });
      return deletedOrder;
    } else {
      return false
    }
  };
  static getOrder = async (rootId) => {
    if (rootId) {
      const order = await Order.findOne({
        where: {
          root_id: rootId,
        },
        include: [
          {
            model: OrderDetails,
            as: "order_details",
          },
          {
            model: ShipmentDetails,
            as: "shipment_details",
            include: [
              {
                model: ShipmentEvents,
                as: "shipment_events",
              },
            ],
          },
        ],
        order: [
          [ShipmentDetails, ShipmentEvents, "event_date", "ASC"],
          [ShipmentDetails, ShipmentEvents, "event_time", "ASC"],
        ],
      });
      return order;
    } else {
      throw new Error();
    }
  };

  static updateOrder = async (rootId, newOrderData) => {
    if (!rootId || !newOrderData) {
      throw new Error("there is not anything!");
    }
    const updateOrder = await Order.update(newOrderData, {
      where: { root_id: rootId },
    });
    return updateOrder;
  };
}

module.exports = QueryOrder;
