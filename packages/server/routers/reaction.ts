import { Router } from 'express'
import { reactionController } from '../controllers'

const router: Router = Router()

router.post('/', reactionController.createReaction)

export default router
