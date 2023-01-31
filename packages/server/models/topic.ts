import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'
import type { ITopic } from '../types/model'

const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_author: {
    type: DataType.STRING,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export default topicModel
