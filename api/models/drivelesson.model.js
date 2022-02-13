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
    type: String,
    enum: ["9:00", "10:00","11:00","12:00","13:00","16:00","17:00","18:00"],
    required: [true, 'You have to select a time slot']
  },
  finishTime: {
    type: String,
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