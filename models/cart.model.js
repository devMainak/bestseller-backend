const mongoose = require('mongoose')

// Defining wishlist mongoose schema
const cartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  categoryName: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Psychology", "Self-Help", "Business"]
  },
  language: {
    type: String,
    default: "English"
  },
  country: {
    type: String,
    default: "United States"
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: Number,
  rating: Number,
  summary: String,
  isDeliveryFree: {
    type: String,
    default: true
  },
  coverImageUrl: String
})

// Defining mongoose model for cart
const CartBooks = mongoose.model("WishlistBooks", cartSchema)

// Exporting wishlist model
module.exports = CartBooks