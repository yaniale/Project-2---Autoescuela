const router = require('express').Router()

//const userRouter = require('./user.router')
const authRouter = require('./auth.router')
//const topicRouter = require('./topic.router')

router.use('/auth', authRouter)

module.exports = router