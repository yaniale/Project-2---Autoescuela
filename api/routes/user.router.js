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
  getMyProfile,
  createPractice,
  getMyPractices
} = require ('../controllers/user.controller')

router.get('/', checkAuth, checkTeacher, getAllUsers)
router.get('/:id',checkAuth, getOneUser)
router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)
router.get('/profile/:id', checkAuth, getMyProfile)
router.post('/profile/:id/practice', checkAuth, checkStudent, createPractice)
router.get('/profile/:id/practice', checkAuth, checkStudent, getMyPractices)

module.exports = router