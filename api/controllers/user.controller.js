const UserModel = require('../models/user.model')
const topicModel = require('../models/topic.model')
const DriveLessonModel = require('../models/drivelesson.model')

const bcrypt = require('bcrypt')

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

async function getUserStatistics(req, res) {
  try {
    const user = await UserModel.findById(req.params.id)
    const statistics = user.studentData.statistics
    const topics = statistics.map(async element => {
      const topic = await topicModel.findById(element.topic)
      return { title: topic.title, number: topic.topicNumber }
    })
    Promise.all(topics).then(names => {
      const result = []
      names.forEach((name, index) => {
        result.push({ number: name.number, topic: name.title, correct: statistics[index].correct, answered: statistics[index].answered, percentage: statistics[index].percentage })
      })
      result.sort((a, b) => a.number - b.number)
      res.status(200).json(result)
    })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getUserMedCert(req, res) {
  try {
    const user = await UserModel.findById(req.params.id)
    const cert = user.studentData.medCert
    if(!cert) return res.status(400).send('No Medical Certificate')
    res.status(200).sendFile(cert, {root: 'public/med-certs'})
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getUserDriveLic(req, res) {
  try {
    const user = await UserModel.findById(req.params.id)
    const license = user.teacherData.drivingLic
    if(!license) return res.status(400).send('No Driving License')
    res.status(200).sendFile(license, {root: 'public/driv-lic'})
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function updateUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { password: 0 })
    if (user.role === 'student' && req.body.hasOwnProperty('studentData.teacher')) {
      const teacher = await UserModel.findById(Object.values(req.body)[0])
      if (teacher.teacherData.students.indexOf(user.id) !== -1) {
        return res.send('student already assigned')
      } else {
        teacher.teacherData.students.push(req.params.id)
        teacher.save()
      }
    }
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

async function updateMyProfile(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(res.locals.user.id, req.body)
    res.status(200).json({ message: `${user.name}'s profile updated!`, user })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

function getProfilePhoto(req, res) {
  try {
    const photo = res.locals.user.photo
    if(!photo) return res.status(400).send('No profile photo')
    res.status(200).sendFile(photo, {root: 'public/profile-photos'})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

function getMyMedCert(req, res) {
  try {
    const cert = res.locals.user.studentData.medCert
    if(!cert) return res.status(400).send('No Medical Certificate')
    res.status(200).sendFile(cert, {root: 'public/med-certs'})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

function getMyDrivingLic(req, res) {
  try {
    const license = res.locals.user.teacherData.drivingLic
    if(!license) return res.status(400).send('No Driving License added')
    res.status(200).sendFile(license, {root: 'public/driv-lic'})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function changePassword(req, res) {
  try {
    const user = res.locals.user
    bcrypt.compare(req.body.currentPassword, user.password, (err, result) => {
      if (err) return res.status(500).send(err)
      if (!result) return res.status(500).send('Incorrect password. Unable to change.')

      user.password = bcrypt.hashSync(req.body.newPassword, 10)
      user.save()
      res.status(200).send(`Your password has been changed`)
    })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function createPractice(req, res) {
  try {
    const student = res.locals.user
    const teacher = student.studentData.teacher

    const bookedPractices = await DriveLessonModel.find({ date: req.body.date, bookSlot: req.body.bookSlot, teacher: teacher })
    if (bookedPractices.length === 0) {
      const lesson = { student: student.id, teacher: teacher, date: req.body.date, bookSlot: req.body.bookSlot }
      const practice = await DriveLessonModel.create(lesson)

      student.studentData.driveLessons.lessons.push(practice.id)
      student.save()

      const teacherUser = await UserModel.findById(teacher)
      teacherUser.teacherData.lessons.push(practice.id)
      teacherUser.save()

      res.status(200).json({ message: `You've booked a drivning lesson!`, practice })
    } else {
      const dayPractices = await DriveLessonModel.find({ date: req.body.date, teacher: teacher })
      const booked = dayPractices.map(practice => {
        return practice.bookSlot
      })
      const arr = ["09:00", "10:00","11:00","12:00","13:00","16:00","17:00","18:00"]
      const free = arr.filter(hour => {
        return booked.indexOf(hour) === -1
      })
      if (free.length > 0) {
        res.status(200).send(`The teacher is busy!!! Available hours for this date are: ${free}`)
      } else {
        res.status(200).send('Sorry, currently there are no more slots available for this date')
      }
    }
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getMyPractices(req, res) {
  try {
    const myPractices = await DriveLessonModel.find({ student: res.locals.user.id })
    res.status(200).json(myPractices)
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function getMyStatistics(req, res) {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user.id !== res.locals.user.id && res.locals.user.role === 'student') {
      return res.status(500).send('Access denied')
    }
    const statistics = user.studentData.statistics
    const topics = statistics.map(async element => {
      const topic = await topicModel.findById(element.topic)
      return { title: topic.title, number: topic.topicNumber }
    })
    Promise.all(topics).then(names => {
      const result = []
      names.forEach((name, index) => {
        result.push({ number: name.number, topic: name.title, correct: statistics[index].correct, answered: statistics[index].answered, percentage: statistics[index].percentage })
      })
      result.sort((a, b) => a.number - b.number)
      res.status(200).json(result)
    })
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}

async function deleteMyPractice(req, res) {
  try {
    const practice = await DriveLessonModel.findById(req.params.id)
    const user = res.locals.user.id
    if (user !== practice.student.toString()) {
      return res.send('User not authorized!')
    }

    const today = new Date(Date.now()).getTime()  // getTime devuelve la hora en milisegundos
    const practiceDate = practice.date.getTime()
    const resultTime = (practiceDate - today) / 1000 / 60 / 60 // convertimos los milisegundos en horas

    if (practice.finishTime) {
      res.status(200).send('Practice already done and cannot be deleted!')

    } else if (resultTime < 24) {
      res.status(200).send('Too late to cancel your lesson!')
    } else {
      const delPractice = await DriveLessonModel.findByIdAndRemove(req.params.id)
      const teacher = await UserModel.findById(delPractice.teacher)
      const student = await UserModel.findById(delPractice.student)

      teacher.teacherData.lessons = teacher.teacherData.lessons.filter(lesson => {
        return lesson.toString() !== delPractice.id
      })
      teacher.save()
      student.studentData.driveLessons.lessons = student.studentData.driveLessons.lessons.filter(lesson => {
        return lesson.toString() !== delPractice.id
      })
      student.save()
      res.status(200).send('Practice deleted successfully!')
    }
  } catch (error) {
    res.status(500).send(`Request Error: ${error}`)
  }
}


module.exports = {
  getAllUsers,
  getOneUser,
  getUserStatistics,
  getUserMedCert,
  getUserDriveLic,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  getProfilePhoto,
  getMyMedCert,
  getMyDrivingLic,
  changePassword,
  createPractice,
  getMyPractices,
  getMyStatistics,
  deleteMyPractice
}