const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  getAllTests,
  getOneTest,
  createTest,
  submitTest,
  updateTest,
  deleteTest
} = require('../controllers/test.controller')

router.get('/', checkAuth, getAllTests)
router.get('/:id', checkAuth, getOneTest)
router.post('/', checkAuth, checkAdmin, createTest)
router.post('/:id', checkAuth, submitTest)
router.put('/:id', checkAuth, checkAdmin, updateTest)
router.delete('/:id', checkAuth, checkAdmin, deleteTest)

module.exports = router