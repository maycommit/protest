import { createModel, DataTypes } from '../../core';

const user = {
  name:{
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
};

export default createModel(user, 'users');