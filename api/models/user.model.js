const mongoose = require('mongoose')
const validate = require('mongoose-validator')


var mailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid email format'
  })
]

var phoneValidator = [
  validate({
    validator: 'isNumeric',
    message: 'Invalid phone number'
  })
]

var dniValidator = [
  validate({
    validator: v => {
      return /[0-9]{8}[a-z]/i.test(v)
    },
    message: 'Invalid email format'
  })
]


const addressSchema = require('./address.model')
const statisticsSchema = require('./statistics.model')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email already exists'],
    immutable: true,
    validate: mailValidator
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  address: [addressSchema],
  dni: {
    type: String,
    required: [true, 'DNI is required'],
    immutable: true,
    validate: dniValidator,
    unique: [true, 'DNI already registered']
  },
  expireDate: {
    type: Date,
    required: [true, 'Expire date is required']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    validate: phoneValidator
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: [true, 'Role is required']
  },
  studentData: {
    medCert: {
      type: String,
      default: ''
    },
    testsDone: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test'
      },
      maxScore: {
        type: Number,
        default: 0
      },
      tries: {
        type: Number,
        default: 1
      }
    }],
    topicDone: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
      },
      status: {
        type: String,
        enum: ['complete', 'incomplete'],
        default: 'incomplete'
      }
    }],
    statistics: [statisticsSchema],
    driveLessons: {
      tries: {
        type: Number,
        default: 0
      },
      paidLessons: {
        type: Number,
        default: 0
      },
      lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driveLesson'
      }]
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  teacherData: {
    drivingLic: {
      type: String,
      default: ''
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'driveLesson'
    }]
  }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel