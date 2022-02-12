const mongoose = require ('mongoose')

const testSchema = new mongoose.Schema({
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question',
    unique: [true, 'Questions are repeated']
  }],
  correct: {
    type: Number,
    default: 0
  },
  answered: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  }
})

const testModel = mongoose.model('test', testSchema)

module.exports = testModel