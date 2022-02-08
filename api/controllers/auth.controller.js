const UserModel = require ('../models/user.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hash

    const user = await UserModel.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating user')
  }
}

module.exports = {
  signup
}