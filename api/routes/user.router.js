const router = require('express').Router()

const {
  checkAuth,
  checkAdmin,
  checkTeacher
} = require ('../utils')

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser
} = require ('../controllers/user.controller')

router.get('/', checkAuth, checkTeacher, getAllUsers)
router.get('/:id',checkAuth, getOneUser)
router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)

module.exports = router