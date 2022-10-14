const DriveLessonModel = require('../models/drivelesson.model')
const UserModel = require('../models/user.model')

async function getAllPractices(req, res) {
  try {
    if (res.locals.user.role === 'teacher') {
      if (Object.keys(req.query)[0] === 'date') {
        const day = Object.values(req.query)[0]
        await DriveLessonModel.find({ teacher: res.locals.user.id, date: { $eq: day } })
          .populate('student teacher')
          .then(lesson => {
            if (lesson.length === 0) {
              res.status(200).send(`You don't have any scheduled lessons for ${day}, you can take the day off!`)
            } else {
              const teacherPractices = lesson.map(teacherPractice => {
                return { teacher: teacherPractice.teacher.name, student: teacherPractice.student.name, studentLastName: teacherPractice.student.lastName, date: teacherPractice.date, bookSlot: teacherPractice.bookSlot, finishTime: teacherPractice.finishTime, startKm: teacherPractice.startKm, finishKm: teacherPractice.finishKm, comments: teacherPractice.comments }
              })
              res.status(200).json(teacherPractices)
            }
          })
      } else {
        await DriveLessonModel.find({ teacher: res.locals.user.id })
          .populate('student teacher')
          .then(lesson => {
            const teacherPractices = lesson.map(teacherPractice => {
              return { teacher: teacherPractice.teacher.name, student: teacherPractice.student.name, studentLastName: teacherPractice.student.lastName, date: teacherPractice.date, bookSlot: teacherPractice.bookSlot, finishTime: teacherPractice.finishTime, startKm: teacherPractice.startKm, finishKm: teacherPractice.finishKm, comments: teacherPractice.comments }
            })
            res.status(200).json(teacherPractices)
          })
      }
    } else if (res.locals.user.role === 'admin') {
      await DriveLessonModel.find(req.query)
        .populate('student teacher')
        .then(lesson => {
          const practices = lesson.map(practice => {
            return { teacher: practice.teacher.name, student: practice.student.name, studentLastName: practice.student.lastName, date: practice.date, bookSlot: practice.bookSlot, finishTime: practice.finishTime }
          })
          res.status(200).json(practices)
        })
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