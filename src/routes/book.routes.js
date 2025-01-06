const express = require("express");
const {
  getBooks,
  getBookById,
  addBook,
} = require("../controller/book.controller");
const router = express.Router();

// Routes for books
router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.post("/", addBook);

module.exports = router;
