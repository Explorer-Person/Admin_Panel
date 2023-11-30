const OrderDetail = require("../../../models/orderModels/orderDetail");
const sequelize = require("../../myDB");

class QueryOrderDetails {
  constructor(orderDetail) {
    this.orderDetail = orderDetail;
  }

  addOrder = async () => {
    const [result] = await sequelize.query(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders');"
    );
    const tableExists = result[0].exists;
    if (!tableExists) {
      await OrderDetail.sync({ force: false, alter: true });
      const newOrderDetail = await OrderDetail.bulkCreate(this.orderDetail);
      return newOrderDetail;
    } else {
      const newOrderDetail = await OrderDetail.bulkCreate(this.orderDetail);
      return newOrderDetail;
    }
  };

  static updateOrderDetails = async (newOrderDetailData, status) => {

    const branchIds = newOrderDetailData.map((detail) => detail.branch_id);
    const branchId = branchIds[0];
    if (!newOrderDetailData) {
      throw new Error("there is no order_details!");
    }
    const orderDetails = await OrderDetail.findAll({
      where: { branch_id: branchId },
    });

    const orderDetailsId = await orderDetails.map(detail=> detail.content_id);
    const newOrderDetailsId = await newOrderDetailData.map(detail=> detail.content_id);
    

    const commonElements = await orderDetailsId.filter(element=> newOrderDetailsId.includes(element));

    const elementsWillUpdated = await newOrderDetailData.filter(detailData=> commonElements.some(detailId=> detailData.content_id === detailId));
    const elementsWillAdded = await newOrderDetailData.filter(detailData => !commonElements.includes(detailData.content_id));
    const elementsWillDeleted = await orderDetails.filter(detailData=> !commonElements.includes(detailData.content_id));
    const elementsWillDeletedIds = await elementsWillDeleted.map(detail=> detail.content_id);

    const updateOrderDetail = await OrderDetail.bulkCreate(elementsWillUpdated, {
      updateOnDuplicate: status,
    });
    const addOrderDetail = await OrderDetail.bulkCreate(elementsWillAdded);
    const deleteOrderDetail = await OrderDetail.destroy({where: {content_id: elementsWillDeletedIds}})

    return updateOrderDetail, addOrderDetail, deleteOrderDetail;
  };
}

module.exports = QueryOrderDetails;
