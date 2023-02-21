import type { Request, Response } from 'express'
import { Comment, Reaction } from '../db'

class CommentController {
  getComments = async (req: Request, res: Response) => {
    try {
      const comments = await Comment.findAll({
        where: { id_topic: req.query.id_topic, id_parent: null },
        include: [Reaction],
      })
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  getComment = async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findOne({
        where: { id: req.params.id },
        include: [Reaction],
      })
      res.json(comment)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  createComment = async (req: Request, res: Response) => {
    try {
      const comment = await Comment.create(req.body)
      res.status(200).json(comment)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new CommentController()
