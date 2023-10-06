'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        phoneNumber: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } catch (error) {
      console.error('Error creating Users table:', error);
      throw error; // Rethrow the error to prevent the migration from proceeding
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('Users');
    } catch (error) {
      console.error('Error dropping Users table:', error);
      throw error; // Rethrow the error to prevent the migration from proceeding
    }
  }
};
