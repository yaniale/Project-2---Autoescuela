const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street is required']
  },
  number: {
    type: Number,
  },
  flat: {
    type: Number,
  },
  door: {
    type: String,
  },
  postalCode: {
    type: Number,
    required: [true, 'Postal Code is required']
  }
})

module.exports = addressSchema
