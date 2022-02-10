const mongoose = require('mongoose')

const driveLessonSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: true
  },
  bookSlot: {
    type: Number,
    required: [true, 'You have to select a time slot']
  },
  startTime: {
    type: Number,
  },
  finishTime: {
    type: Number,
  },
  date: {
    type: Date,
    required: [true, 'You have to select a day']
  },
  startKm: {
    type: Number,
  },
  finishKm: {
    type: Number,
  },
  comments: {
    type: String
  }
})

const DriveLessonModel = mongoose.model('driveLesson', driveLessonSchema)
module.exports = DriveLessonModel