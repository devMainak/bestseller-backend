const express = require('express')
const app = express()
const initializeDatabse = require('./db/db.connection')
const books = require('./models/books.model')

// Initializing DB connection
initializeDatabse()

// JSON parsing middleware implemented
app.use(express.json())

// Function to read all books from DB
