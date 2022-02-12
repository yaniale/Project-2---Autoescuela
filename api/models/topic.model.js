const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'Title already exists']
  },
  content: {
    type: String
  },
  topicNumber: {
    type: Number,
    required: [true, 'Topic Number is required'],
    unique: [true, 'Another Topic already has this number']
  }
})

const topicModel = mongoose.model ('topic', topicSchema)

module.exports = topicModel