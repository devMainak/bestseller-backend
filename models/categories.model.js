const mongoose = require('mongoose')

// Defining category schema
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: "https://elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-e1464023124869.jpeg"
  }
})

// Defining categories model
const Categories = mongoose.model('Categories', categorySchema)

// exporting modules
module.exports = Categories