import { Router } from 'express'
import { expressValidator } from '../middleware/validator'
import commentRouter from './comment'
import reactionRouter from './reaction'
import topicRouter from './topic'

const router: Router = Router()

router.use('/forum/comment', expressValidator(), commentRouter)
router.use('/forum/reaction', expressValidator(), reactionRouter)
router.use('/forum/topic', expressValidator(), topicRouter)

export default router
