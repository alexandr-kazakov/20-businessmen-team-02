import type { Request, Response } from 'express'
import { Comment, Reaction } from '../db'

class CommentController {
  getAllComments = async (req: Request, res: Response) => {
    try {
      const comments = await Comment.findAll({
        include: [Reaction],
        where: { id_topic: req.query.id_topic },
      })
      res.json(comments)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  getComment = async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findAll({
        include: [Reaction],
        where: { id: req.params.id },
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

  deleteComment = async (req: Request, res: Response) => {
    try {
      await Comment.destroy({ where: { id: req.params.id } })
      res.status(200).json('ok')
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new CommentController()
