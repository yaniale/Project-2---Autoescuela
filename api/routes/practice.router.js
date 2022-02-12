const router = require ('express').Router()

const {
  checkAuth,
  checkAdmin,
  checkTeacher
} = require ('../utils')

const {
  getAllPractices,
  updatePractice,
  deletePractice
 } = require('../controllers/practice.controller')


router.get('/', checkAuth, checkTeacher, getAllPractices)
router.patch('/:id',checkAuth, checkTeacher, updatePractice)
router.delete('/:id', checkAuth, checkAdmin, deletePractice)

module.exports = router