const UserModel = require('../models/user.model')
const TopicMocel = require('../models/topic.model')
const topicModel = require('../models/topic.model')

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({} , { password: 0 })
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

async function getStatistics(req, res) {
  try {
    const user = res.locals.user
    if ( user.id !== req.params.id && user.role === 'student' ) {
      return res.status(500).send('Access denied')
    }
    const statistics = user.studentData.statistics
    console.log(statistics)
    const topics = statistics.map(async element => {
      const topic = await topicModel.findById(element.topic)
      return topic.title
    })
    Promise.all(topics).then(names => {
      const result = []
      names.forEach((name, index) => {
        result.push({ topic: name, correct: statistics[index].correct, answered: statistics[index].answered, percentage: statistics[index].percentage })
      })
      res.status(200).json(result)
    })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { password: 0 })
    res.status(200).json({message: `${user.name}'s profile updated!`, user })
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

module.exports = {
  getAllUsers,
  getOneUser,
  getStatistics,
  updateUser,
  deleteUser
}