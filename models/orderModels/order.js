const { DataTypes } = require('sequelize');
const sequelize = require('../../db/myDB');


const Order = sequelize.define('orders', {
   root_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull:false,
   },
    amazon_order_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date_submitted: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shipping_service: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sales_channel: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    packing_slip_comments: {
      type: DataTypes.TEXT,
    },
    amazon_tracking_number: {
      type: DataTypes.STRING(255),
    },
    tracking_code: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false, // Disable Sequelize's default timestamp fields (createdAt and updatedAt)
  });

  

  module.exports = Order;
