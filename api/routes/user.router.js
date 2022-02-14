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
  getUserStatistics,
  getUserMedCert,
  getUserDriveLic,
  updateUser,
  deleteUser,
  assignTeacher,
  getMyProfile,
  updateMyProfile,
  getProfilePhoto,
  getMyMedCert,
  getMyDrivingLic,
  changePassword,
  createPractice,
  getMyPractices,
  getMyStatistics,
  deleteMyPractice
} = require ('../controllers/user.controller')

router.get('/', checkAuth, checkTeacher, getAllUsers)
router.get('/:id',checkAuth, getOneUser)
router.get('/:id/statistics', checkAuth, checkTeacher, getUserStatistics)
router.get('/:id/certificate', checkAuth, checkAdmin, getUserMedCert)
router.get('/:id/license', checkAuth, checkAdmin, getUserDriveLic)
router.patch('/:id', checkAuth, checkAdmin, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)
router.patch('/:studentId/teacher/:teacherId', checkAuth, checkAdmin, assignTeacher)
router.get('/profile/:id', checkAuth, getMyProfile)
router.patch('/profile/:id', checkAuth, updateMyProfile)
router.get('/profile/:id/photo', checkAuth, getProfilePhoto)
router.get('/profile/:id/certificate', checkAuth, getMyMedCert)
router.get('/profile/:id/license', checkAuth, checkTeacher, getMyDrivingLic)
router.post('/profile/:id/password', checkAuth, changePassword)
router.post('/profile/:id/practice', checkAuth, checkStudent, createPractice)
router.get('/profile/:id/practice', checkAuth, checkStudent, getMyPractices)
router.get('/profile/:id/statistics', checkAuth, getMyStatistics)
router.delete('/profile/:userId/practice/:id', checkAuth, checkStudent, deleteMyPractice)


module.exports = router