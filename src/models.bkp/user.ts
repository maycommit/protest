import { createModel, DataTypes } from '../../../src';

const user = {
  name:{
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email:{
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  password:{
    type: new DataTypes.STRING(20),
    allowNull: false,
  }
};

export default createModel(user, 'users');