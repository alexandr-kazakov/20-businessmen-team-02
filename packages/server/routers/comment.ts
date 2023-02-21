import { Router } from 'express'
import { commentController } from '../controllers'

const router: Router = Router()

router.get('/', commentController.getComments)
router.get('/:id', commentController.getComment)
router.post('/', commentController.createComment)

export default router
