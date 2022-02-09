const router = require ('express').Router()

const {
  checkAuth,
  checkAdmin,
} = require ('../utils')

const {
  signup,
  login
} = require ('../controllers/auth.controller')

router.post('/signup', checkAuth, checkAdmin, signup)
router.post('/login', login)

module.exports = router