import { Router } from 'express'
import { topicController } from '../controllers'

const router: Router = Router()

router.get('/', topicController.getTopics)
router.get('/:id', topicController.getTopic)
router.post('/', topicController.createTopic)

export default router
