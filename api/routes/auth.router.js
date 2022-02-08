const router = require ('express').Router()

// const {
//   signup,
//   login
// } = require (../controllers/auth.controller)

router.post('/signup', ()=> {
  console.log('auth/signup funciona')
})

module.exports = router