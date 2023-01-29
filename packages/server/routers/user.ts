import { Router } from 'express'
import { userController } from '../controllers'

const router: Router = Router()

router.get('/auth', userController.findOrCreate)

export default router
