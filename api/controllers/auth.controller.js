const UserModel = require('../models/user.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function signup(req, res) {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hash

    const user = await UserModel.create(req.body)
    res.status(200).json({ message: `${user.name}'s profile successfully created!`, user })
  } catch (error) {
    res.status(500).send(`Error creating user: ${error}`)
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(500).send('Email or password incorrect')

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(500).send(err)
      if (!result) return res.status(500).send('Email or password incorrect')

      const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1h' })
      res.status(200).json({ token: token, id: user.id })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error login user')
  }
}

module.exports = {
  signup,
  login
}