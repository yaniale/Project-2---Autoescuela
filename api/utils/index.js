const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const checkAuth = (req, res, next) => {
  if (!req.headers.token) return res.status(404).send('User not logged in')

  jwt.verify(req.headers.token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(500).send('Token not valid')
    const user = await UserModel.findOne({ email: decoded.email })

    if (!user) return res.status(500).send('Token not valid')
    else {
      res.locals.user = user
    }
    next()
  })
}

const checkAdmin = (req, res, next) => {
  if (res.locals.user.role !== 'admin') {
    res.send('Error: User not authorized')
  } else {
    next()
  }
}

const checkTeacher = (req, res, next) => {
  if (res.locals.user.role === 'student') {
    res.send('Error: User not authorized')
  } else {
    next()
  }
}

const checkStudent = (req, res, next) => {
  if (res.locals.user.role !== 'student') {
    res.send('Error: User not authorized')
  } else {
    next()
  }
}

module.exports = {
  checkAuth,
  checkAdmin,
  checkTeacher,
  checkStudent
}