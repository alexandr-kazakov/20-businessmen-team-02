import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'
import type { IReaction } from '../types/model'

const reactionModel: ModelAttributes<Model, IReaction> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_comment: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_author: {
    type: DataType.STRING,
  },
  value: {
    type: DataType.STRING,
  },
}

export default reactionModel
