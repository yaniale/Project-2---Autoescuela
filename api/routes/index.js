const router = require('express').Router()

const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const topicRouter = require('./topic.router')
const questionRouter = require('./question.router')
const testRouter = require('./test.router')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/topic', topicRouter)
router.use('/question', questionRouter)
router.use('/test', testRouter)

module.exports = router