const mongoose = require ('mongoose')

const testSchema = new mongoose.Schema({
  test: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question',
    unique: [true, 'Question already added']
  }],
  correct: {
    type: Number
  },
  answered: {
    type: Number
  },
  percentage: {
    type: Number
  }
})

const testModel = mongoose.model('test', testSchema)