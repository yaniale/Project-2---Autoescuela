const router = require('express').Router()

const {
  checkAuth,
  checkStudent,
  checkAdmin,
  checkTeacher
} = require ('../utils')

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createPractice
} = require ('../controllers/user.controller')

router.get('/', checkAuth, checkTeacher, getAllUsers)
router.get('/:id',checkAuth, getOneUser)
router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)
router.post('/profile/practice', checkAuth, checkStudent, createPractice)

module.exports = router