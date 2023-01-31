import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'
import type { IUser } from '../types/model'

const userModel: ModelAttributes<Model, IUser> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  display_name: {
    type: DataType.STRING,
    allowNull: true,
  },
  first_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  second_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export default userModel
