const mongoose = require('mongoose')

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
    unique: true,
    immutable: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  //address: [addressSchema],
  // dni: {
  //   type: String,
  //   required: [true, 'DNI is required'],
  //   unique: true,
  //   immutable: true
  // },
  // expireDate: {
  //   type: Date,
  //   required: [true, 'Expire date is required']
  // },
  // birthDate: {
  //   type: Date,
  //   required: [true, 'Birth date is required']
  // },
  // phone: {
  //   type: Number,
  //   required: [true, 'Phone is required']
  // },
  // photo: {
  //   type: String
  // },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: [true, 'Role is required']
  },
  studentData: {
    medCert: {
      type: String,
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
    statistics: [statisticsSchema]
  }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel