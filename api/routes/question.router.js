const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  getAllQuestions,
  getOneQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/question.controller')

router.get('/', checkAuth, checkAdmin, getAllQuestions)
router.get('/:id', checkAuth, checkAdmin, getOneQuestion)
router.post('/', checkAuth, checkAdmin, createQuestion)
router.put('/:id', checkAuth, checkAdmin, updateQuestion),
router.delete('/:id', checkAuth, checkAdmin, deleteQuestion)

module.exports = router