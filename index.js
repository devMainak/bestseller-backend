const express = require('express')
const app = express()
const initializeDatabse = require('./db/db.connection')
const BooksData = require('./models/booksData.model')
const BooksCategories = require('./models/booksCategories.model')

// Initializing DB connection
initializeDatabse()

// JSON parsing middleware implemented
app.use(express.json())

// Function to read all books from DB
