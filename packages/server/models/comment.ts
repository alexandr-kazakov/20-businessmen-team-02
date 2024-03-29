import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'
import type { IComment } from '../types/model'

const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_topic: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_parent: {
    type: DataType.STRING,
  },
  id_author: {
    type: DataType.STRING,
    allowNull: false,
  },
  login_author: {
    type: DataType.STRING,
    allowNull: false,
  },
  text: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export default commentModel
