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


router.get('/', checkAuth,
// checkAdmin,
 getAllPractices)
router.put('/:id',checkAuth, checkAdmin, checkTeacher, updatePractice)
router.delete('/:id', checkAuth, checkAdmin, checkTeacher, deletePractice)

module.exports = router