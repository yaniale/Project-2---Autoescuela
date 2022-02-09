const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  getAllTopics,
  getOneTopic,
  createTopic
} = require ('../controllers/topic.controller')

router.get('/', checkAuth, getAllTopics),
router.get('/:id',checkAuth, getOneTopic)
router.post('/', checkAuth, checkAdmin, createTopic)

module.exports = router