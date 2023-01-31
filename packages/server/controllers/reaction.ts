import type { Request, Response } from 'express'
import { Reaction } from '../db'

class ReactionController {
  getAllReactions = async (_: Request, res: Response) => {
    try {
      const reactions = await Reaction.findAll()
      res.json(reactions)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  createReaction = async (req: Request, res: Response) => {
    try {
      const foundReaction = await Reaction.findOne({
        where: {
          id_author: req.body.id_author,
          id_comment: req.body.id_comment,
          value: req.body.value,
        },
      })

      if (foundReaction) {
        await foundReaction.destroy()
        res.status(200).json('ok')
      } else {
        const reaction = await Reaction.create(req.body)
        res.status(200).json(reaction)
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new ReactionController()
