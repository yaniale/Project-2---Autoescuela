const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'Topic already exists']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  }
})

const topicModel = mongoose.model('topic', topicSchema)

module.exports = topicModel