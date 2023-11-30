const { DataTypes } = require('sequelize');
const sequelize = require('../../db/userDB');
const {v4:uuidv4} = require('uuid')

const User = sequelize.define('users', {
   user_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
    allowNull:false,
   },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false, // Disable Sequelize's default timestamp fields (createdAt and updatedAt)
  });

  

  module.exports = User;
