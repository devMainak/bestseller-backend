const mongoose = require('mongoose')

// Defining address schema
const userSchema = new mongoose.Schema({
  user: {
    name: {
      required: true,
      firstName: String,
      lastName: String
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    }
  },
  address: [{
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
  }]
})

// Defining mongoose model for schema
const User = mongoose.model("bestseller-users", userSchema)

// Exporting the module
module.exports = User