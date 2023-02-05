import type { Request, Response } from 'express'
import { Topic } from '../db'

class TopicController {
  getTopics = async (_: Request, res: Response) => {
    try {
      const topics = await Topic.findAll()
      res.json(topics)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  getTopic = async (req: Request, res: Response) => {
    try {
      const topic = await Topic.findOne({ where: { id: req.params.id } })
      res.json(topic)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  createTopic = async (req: Request, res: Response) => {
    try {
      const topic = await Topic.create(req.body)
      res.status(200).json(topic)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  deleteTopic = async (req: Request, res: Response) => {
    try {
      await Topic.destroy({ where: { id: req.params.id } })
      res.status(200).json('ok')
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new TopicController()
