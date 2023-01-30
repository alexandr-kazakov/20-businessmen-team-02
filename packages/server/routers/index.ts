import { Router } from 'express'
import commentRouter from './comment'
import topicRouter from './topic'
import userRouter from './user'

const router: Router = Router()

router.use('/forum/comment', commentRouter)
router.use('/forum/topic', topicRouter)
router.use('/forum/user', userRouter)

export default router
