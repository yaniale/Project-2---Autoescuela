const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  getAllTests,
  getOneTest,
  createTest
} = require('../controllers/test.controller')

router.get('/', checkAuth, getAllTests)
router.get('/:id', checkAuth, getOneTest)
router.post('/', checkAuth, checkAdmin, createTest)

module.exports = router