const { DataTypes } = require('sequelize');
const sequelize = require('../../db/myDB');


const OrderDetail = sequelize.define('order_details', {
  product_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
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
  timestamps: false, // Disable Sequelize's default timestamp fields (createdAt and updatedAt)
});



module.exports = OrderDetail;