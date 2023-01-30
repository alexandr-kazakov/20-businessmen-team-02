import { Router } from 'express'
import { userController } from '../controllers'

const router: Router = Router()

router.post('/', userController.createUser)

export default router
