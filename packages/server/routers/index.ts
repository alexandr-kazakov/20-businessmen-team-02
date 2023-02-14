import { Router } from 'express'
import commentRouter from './comment'
import reactionRouter from './reaction'
import topicRouter from './topic'

const router: Router = Router()

router.use('/forum/comment', commentRouter)
router.use('/forum/reaction', reactionRouter)
router.use('/forum/topic', topicRouter)

export default router
