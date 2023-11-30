const { DataTypes } = require('sequelize');
const sequelize = require('../../db/myDB');


const ShippingEvent = sequelize.define('shipment_events', {
  event_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  tracking_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  carrier_tracking_code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  event_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  event_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  event_details: {
    type: DataTypes.TEXT,
  },
  event_detail_id: {
    type: DataTypes.STRING(255),
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


module.exports = ShippingEvent;