const DriveLessonModel = require('../models/drivelesson.model')

async function getAllPractices(req, res) {
  try {
    const practices = await DriveLessonModel.find()
    res.status(200).json(practices)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function updatePractice(req, res) {
  try {
    const practice = await DriveLessonModel.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: 'Driving Lesson updated!', practice })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function deletePractice(req, res) {
  try {
    await DriveLessonModel.findByIdAndRemove(req.params.id)
    res.status(200).send('Practice deleted successfully!')
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

module.exports = {
  getAllPractices,
  updatePractice,
  deletePractice
}