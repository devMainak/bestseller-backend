const BooksData = require("../models/booksData.model");

// Function to seed categories in DB
const seedBooks = async (book) => {
  try {
    const bookToSave = new BooksData(book);
    const savedBook = await bookToSave.save();
    return savedBook;
  } catch (error) {
    throw error;
  }
};

exports.addBook = async (req, res) => {
  try {
    const savedBook = await seedBooks(req.body);
    if (savedBook) {
      res
        .status(201)
        .json({ message: "Book saved successfully.", savedBook: savedBook });
    } else {
      res
        .status(400)
        .json({ message: "Some error occured while saving book." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save new book." });
  }
};

// Function to read all books from DB
const readAllBooks = async () => {
  try {
    const books = await BooksData.find();
    return books;
  } catch (err) {
    throw err;
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length > 0) {
      res.status(200).json({ data: { books: books } });
    } else {
      res.status(404).json({ message: "No books found." });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Failed to load books." });
  }
};

// Function to read books by :bookId
const readBooksById = async (bookId) => {
  try {
    const bookById = await BooksData.findById(bookId);
    return bookById;
  } catch (err) {
    throw err;
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await readBooksById(req.params.bookId);
    if (book) {
      res.status(200).json({ data: { book: book } });
    } else {
      res.status(404).json({ message: "No Book Found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load book." });
  }
};
