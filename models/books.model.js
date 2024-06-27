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
  genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categories'}],
  language: {
    type: String,
    default: "English"
  },
  country: {
    type: String,
    default: "United States"
  },
  rating: Number,
  summary: String,
  coverImageUrl: String
})

// Defining the mongoose model
const Books = mongoose.model('Books', booksSchema)

// Exporting books model
module.exports = Books