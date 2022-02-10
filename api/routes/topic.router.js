const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  getAllTopics,
  getOneTopic,
  createTopic,
  updateTopic,
  deleteTopic
} = require ('../controllers/topic.controller')

router.get('/', checkAuth, getAllTopics),
router.get('/:id',checkAuth, getOneTopic)
router.post('/', checkAuth, checkAdmin, createTopic)
router.put('/:id', checkAuth, checkAdmin, updateTopic)
router.delete('/:id', checkAuth, checkAdmin, deleteTopic)

module.exports = router