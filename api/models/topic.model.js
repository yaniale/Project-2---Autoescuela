const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'Title already exists']
  },
  content: {
    type: String
  }
})

const topicModel = mongoose.model ('topic', topicSchema)

module.exports = topicModel