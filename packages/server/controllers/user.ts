import type { Request, Response } from 'express'
// import { User } from '../db'

class UserController {
  findOrCreate = async (req: Request, res: Response) => {
    console.log(req.body)
    res.json('dadad')

    // User.findAll(req.params.id, { ...req.body })
    //   .then(user => res.status(200).json(user))
    //   .catch(err => res.status(500).json({ error: ['db error: unable to find or create user', err.status] }))
  }
}

export default new UserController()
