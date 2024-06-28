const express = require("express");
const app = express();
const initializeDatabse = require("./db/db.connection");
const BooksData = require("./models/booksData.model");
const BooksCategories = require("./models/booksCategories.model");

// Initializing DB connection
initializeDatabse();

// JSON parsing middleware implemented
app.use(express.json());

//

// Function to seed categories in DB
const seedBooks = async () => {
  try {
    const bookToSave = new BooksData(book);
    const savedBook = await bookToSave.save();
    console.log(savedBook);
  } catch (error) {
    throw error;
  }
};

seedBooks();

// // Listiening to the port for HTTP requests
// const PORT = 3000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
