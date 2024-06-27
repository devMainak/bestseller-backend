const express = require('express')
const app = express()
const initializeDatabse = require('./db/db.connection')
const BooksData = require('./models/booksData.model')
const BooksCategories = require('./models/booksCategories.model')

// Initializing DB connection
initializeDatabse()

// JSON parsing middleware implemented
app.use(express.json())

// Function to seed books in DB
const seedBooks = async (bookToSave) => {
  try {
    const savedBook = await BooksData.save(bookToSave)
    return savedBook
  } catch(error) {
    throw error
  }
}



// Listiening to the port for HTTP requests
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})