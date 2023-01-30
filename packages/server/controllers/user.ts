import type { Request, Response } from 'express'
import { User } from '../db'

class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      console.log(req.body)

      const user = await User.findOrCreate({
        where: { id: req.params.id },
        defaults: { ...req.body },
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'db error' })
    }
  }
}

export default new UserController()
