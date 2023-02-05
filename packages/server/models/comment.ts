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
  id_comment: {
    type: DataType.STRING,
  },
  id_author: {
    type: DataType.STRING,
  },
  login_author: {
    type: DataType.STRING,
  },
  text: {
    type: DataType.STRING,
  },
}

export default commentModel
