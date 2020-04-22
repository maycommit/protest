const { DataTypes } = require('sequelize');

export default (sequelize) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};