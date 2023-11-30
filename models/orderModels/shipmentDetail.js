const { DataTypes } = require('sequelize');
const sequelize = require('../../db/myDB');


const ShipmentDetail = sequelize.define('shipment_details', {
  tracking_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  carrier_tracking_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ship_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  delivery_estimate: {
    type: DataTypes.DATEONLY,
  },
  carrier: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address_line_1: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address_line_2: {
    type: DataTypes.STRING(255),
  },
  city: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  postal_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email_address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  detail_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  branch_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'root_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});




module.exports = ShipmentDetail;