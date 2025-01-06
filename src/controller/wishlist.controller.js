const WishlistBooks = require("../models/wishlist.model");

// Function to read all books from wishlist db
const readBookFromWishlist = async () => {
  try {
    const books = await WishlistBooks.find().populate("book");
    return books;
  } catch (error) {
    throw error;
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const books = await readBookFromWishlist();
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: "No book found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load books in wishlist." });
  }
};

// Function to seed data to wishlist db
const seedToWishlist = async (book) => {
  try {
    const bookToSeed = new WishlistBooks(book);
    const savedBook = await bookToSeed.save();
    await savedBook.populate("book");
    return savedBook;
  } catch (err) {
    throw err;
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const savedBook = await seedToWishlist(req.body);
    if (savedBook) {
      res.status(201).json({
        message: "Successfully added to wishlist",
        savedBook: savedBook,
      });
    } else {
      res.status(400).json({ message: "Failed to add in wishlist." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add in wishlist." });
  }
};

// Function to delete book by id from wishlist db
const deleteBookFromWishlist = async (bookId) => {
  try {
    const deletedBook = await WishlistBooks.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (err) {
    throw err;
  }
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    const deletedBook = await deleteBookFromWishlist(req.params.bookId);
    if (deletedBook) {
      res.status(200).json({
        message: "Successfully deleted book form wishlist",
        deletedBook: deletedBook,
      });
    } else {
      res.status(400).json({ message: "Failed to delete book from wishlist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete book from wishlist" });
  }
};
