const DriveLessonModel = require('../models/drivelesson.model')
const UserModel = require('../models/user.model')

async function getAllPractices(req, res) {
  try {
    if (res.locals.user.role === 'teacher') {
      const teacherPractices = await DriveLessonModel.find({ teacher: res.locals.user.id })
      res.status(200).json(teacherPractices)
    } else if (res.locals.user.role === 'admin') {
      const practices = await DriveLessonModel.find(req.query)
      res.status(200).json(practices)
    }
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
    const practice = await DriveLessonModel.findById(req.params.id)
    if (practice.finishTime) {
      res.status(200).send('Practice cannot be deleted!')
    } else {
      await DriveLessonModel.findByIdAndRemove(req.params.id)
      const teacher = await UserModel.findById(practice.teacher)
      const student = await UserModel.findById(practice.student)
      
      teacher.teacherData.lessons = teacher.teacherData.lessons.filter(lesson => {
        return lesson.toString() !== practice.id
      })
      teacher.save()
      student.studentData.driveLessons.lessons = student.studentData.driveLessons.lessons.filter(lesson => {
        return lesson.toString() !== practice.id
      })
      student.save()
      res.status(200).send('Practice deleted successfully!')
    }
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

module.exports = {
  getAllPractices,
  updatePractice,
  deletePractice
}