const mongoose = require('mongoose')

const statisticsSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic'
  },
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

module.exports = statisticsSchema