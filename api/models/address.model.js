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
    required: [true, 'Password is required']
  },
  postalCode: {
    type: Number,
  }
})

module.exports = AddressSchema