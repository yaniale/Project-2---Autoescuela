const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Text is required']
  },
  picture: {
    type: String,
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  options: [{}],
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic',
    required: [true, 'Topic is required']
  }
})

const questionModel = mongoose.model('question', questionSchema)

module.exports = questionModel