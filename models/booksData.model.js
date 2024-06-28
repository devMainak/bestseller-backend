const mongoose = require('mongoose')

// Defining Books mongoose schema
const booksSchema = new mongoose.Schema({
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
  price: Number,
  rating: Number,
  summary: String,
  coverImageUrl: String
})

// Defining the mongoose model
const BooksData = mongoose.model('BooksData', booksSchema)

// Exporting books model
module.exports = BooksData