'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const DataTypes = Sequelize;
    await queryInterface.createTable('order_details', {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("order_details")
  }
};
