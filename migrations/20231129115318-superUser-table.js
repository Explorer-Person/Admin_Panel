'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const DataTypes = Sequelize;
    await queryInterface.createTable('super_users', {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('super_users')
  }
};
