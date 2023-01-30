import type { Request, Response } from 'express'
import { Comment } from '../db'

class CommentController {
  getAllComments = async (req: Request, res: Response) => {
    console.log(req.body)
    res.json('topic')
  }

  getComment = async (req: Request, res: Response) => {
    console.log(req.body)
    res.json('topic')
  }

  createComment = async (req: Request, res: Response) => {
    try {
      console.log(req.body)

      const comment = await Comment.create({
        id_topic: 31,
        id_author: 31,
        text: 'dasd',
        date: '30.01.2023',
      })

      res.status(200).json(comment)
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
}

export default new CommentController()
