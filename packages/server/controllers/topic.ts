import type { Request, Response } from 'express'
import { Topic } from '../db'

class TopicController {
  getAllTopics = async (_: Request, res: Response) => {
    const topics = await Topic.findAll()
    res.json(topics)
  }

  getTopic = async (req: Request, res: Response) => {
    console.log(req.body)
    res.json('topic')
  }

  createTopic = async (req: Request, res: Response) => {
    try {
      const topic = await Topic.create(req.body)
      res.status(200).json(topic)
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
}

export default new TopicController()
