'use strict';

const tableName = 'Users';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(tableName, 'password', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(tableName, 'password');
  },
};
