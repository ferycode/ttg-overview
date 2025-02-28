'use strict';

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
      },
      deletedAt: {
        allowNull: true,
        type: 'TIMESTAMP'
      }
    },
    {
      tableName: 'Users',
      paranoid: true
    }
  );
  
  return User;
};
