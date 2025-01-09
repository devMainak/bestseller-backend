const mongoose = require('mongoose')

// Defining address schema
const userAddressSchema = new mongoose.Schema({
    houseNumber: String,
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: Number,
      required: true
    }
})

const UserAddress = mongoose.model("bestseller-users-addresses", userAddressSchema)

module.exports = UserAddress