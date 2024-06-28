const express = require("express");
const app = express();
const initializeDatabse = require("./db/db.connection");
const BooksData = require("./models/booksData.model");
const BooksCategories = require("./models/booksCategories.model");

// Initializing DB connection
initializeDatabse();

// JSON parsing middleware implemented
app.use(express.json());

// Function to seed books in DB 
const seedCategories = async (category) => {
  try {
    const categoryToSave = new BooksCategories(category);
    const savedCategory = await categoryToSave.save();
    return savedCategory
  } catch (error) {
    throw error;
  }
}

// POST method on "/categories" to seed categories in DB
app.post("/categories", async (req, res) => {
 try {
   const savedCategory = await seedCategories(req.body)
   if (savedCategory)
   {
     res.status(201)
     .json({message: "Category saved successfully.", savedCategory: savedCategory})
   } else {
     res.status(400)
     .json({error: "Some error occured while saving new category."})
   }
 } catch (err) {
   console.error(err)
   res.status(500)
   .json({error: "Failed to save new category"})
 }
})

// Function to seed categories in DB
const seedBooks = async () => {
  try {
    const bookToSave = new BooksData(book);
    const savedBook = await bookToSave.save();
    return savedBook
  } catch (error) {
    throw error;
  }
};

// POST method on "/books" to seed categories in DB
app.post("/books", async (req, res) => {
  try {
    const savedBook = await seedBooks(req.body)
    if (savedBook) {
      res.status(201)
      .json({message: "Book saved successfully.", savedBook: savedBook})
    } else {
      res.status(400)
      .json({error: "Some error occured while saving book."})
    }
  } catch (err) {
    console.error(err)
     res.status(500)
     .json({error: "Failed to save new book."})
  }
})

// Function to read all books from DB
const readAllBooks = async () => {
  try {
    const books = await BooksData.find()
    return books
  } catch(err) {
    throw err
  }
}

// GET method on "/books" to get all books
app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks()
    if (books.length > 0) {
      res.status(200)
      .json({data: {books: books}})
    } else {
      res.status(404)
      .json({error: "No books found."})
    }
  } catch (error) {
    console.error(err)
       res.status(500)
       .json({error: "Failed to load books."})
    }
})

// Function to read books by :_Id
const readBooksById = async (bookId) => {
  try {
    const bookById = await BooksData.findById(bookId)
    return bookById
  } catch(err) {
    throw err
  }
}

// GET method on "/books/:bookId" to get book data by Id
app.get("/books/:bookId", async (req, res) => {
  try {
    const book = await readBooksById(req.params.bookId)
    if (book) {
      res.status(200)
      .json({data: {book: book}})
    } else {
      res.status(404)
      .json({error: "No Book Found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load book."})
  }
})

// Function to read all categories
const readAllCategories = async () => {
  try {
    const categories = await BooksCategories.find()
    return categories
  } catch (err) {
    throw err
  }
}

// GET method on "/categories" to read all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await readAllCategories()
    if (categories.length > 0) {
      res.status(200)
      .json({data: {categories: categories}})
    } else {
      res.status(404)
      .json({error: "No categories found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load categories."})
  }
})

// Listiening to the port for HTTP requests
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
