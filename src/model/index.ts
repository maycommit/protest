import { Model, Sequelize, ModelAttributes, DataTypes } from 'sequelize';

export { DataTypes } from 'sequelize';

class NewModel extends Model {}

export const createModel = (data: ModelAttributes, tableName: string) => (sequelize: Sequelize) =>  NewModel
  .init(data, {
    sequelize,
    tableName,
  });
