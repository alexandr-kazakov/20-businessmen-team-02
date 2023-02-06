import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import * as model from './models'

dotenv.config()

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT || ''),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', model.topicModel)
export const Comment = sequelize.define('Comment', model.commentModel)
export const Reaction = sequelize.define('Reaction', model.reactionModel)

Comment.hasMany(Comment, { foreignKey: 'id_parent' })
Comment.belongsTo(Comment, { foreignKey: 'id_parent', targetKey: 'id' })

Comment.hasMany(Reaction, { foreignKey: 'id_comment' })
Reaction.belongsTo(Comment, { foreignKey: 'id_comment', targetKey: 'id' })

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
