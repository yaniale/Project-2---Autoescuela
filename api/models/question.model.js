const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: {
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
  options: [{
    type: String
  }],
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic'
  }
})

const questionModel = mongoose.model('question', questionSchema)

module.exports = questionModel