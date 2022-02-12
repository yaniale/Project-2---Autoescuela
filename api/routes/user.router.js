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
  getStatistics,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  getProfilePhoto,
  getMedCertificate,
  createPractice,
  getMyPractices,
  changePassword,
  deleteMyPractice
} = require ('../controllers/user.controller')

router.get('/', checkAuth, checkTeacher, getAllUsers)
router.get('/:id',checkAuth, getOneUser)
router.get('/:id/statistics', checkAuth, getStatistics)
router.put('/:id', checkAuth, checkAdmin, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)
router.get('/profile/:id', checkAuth, getMyProfile)
router.patch('/profile/:id', checkAuth, updateMyProfile)
router.get('/profile/:id/photo', checkAuth, getProfilePhoto)
router.get('/profile/:id/certificate', checkAuth, getMedCertificate)
router.post('/profile/:id/practice', checkAuth, checkStudent, createPractice)
router.get('/profile/:id/practice', checkAuth, checkStudent, getMyPractices)
router.post('/profile/:id/password', checkAuth, changePassword)
router.delete('/profile/:userId/practice/:id', checkAuth, checkStudent, deleteMyPractice)


module.exports = router