const mongoose = require('mongoose')

// Defining category schema
const booksCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: "https://elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-e1464023124869.jpeg"
  }
})

const BooksCategories = mongoose.model('Categories', booksCategorySchema)

module.exports = BooksCategories