const router = require('express').Router()

const {
  checkAuth,
  checkStudent
} = require ('../utils')

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createPractice
} = require ('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/profile/practice', checkAuth, checkStudent, createPractice)


module.exports = router