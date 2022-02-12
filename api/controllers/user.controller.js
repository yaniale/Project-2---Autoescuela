const UserModel = require('../models/user.model')
const DriveLessonModel = require('../models/drivelesson.model')


async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({}, { password: 0 })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getOneUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id, { password: 0 })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { password: 0 })
    res.status(200).json({ message: `${user.name}'s profile updated!`, user })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).send(`${user.name}'s profile deleted`)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getMyProfile(req, res) {
  try {
    const user = await UserModel.findById(res.locals.user.id, { password: 0 })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function createPractice(req, res) {
  try {
    const bookedPractices = await DriveLessonModel.find({date: req.body.date, bookSlot: req.body.bookSlot, teacher: req.body.teacher})
    if(bookedPractices.length === 0) {
    const practice = await DriveLessonModel.create(req.body)
    res.status(200).json(practice)
    } else {
      res.send('The teacher is busy!!')
    }
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getMyPractices(req, res) {
  try {
    const myPractices = await DriveLessonModel.find({student: res.locals.user.id})
    res.status(200).json(myPractices)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getMyProfile,
  createPractice,
  getMyPractices
}