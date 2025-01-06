const CartBooks = require("../models/cart.model");

// Function to read all books from cart db
const readBooksFromCart = async () => {
  try {
    const books = await CartBooks.find().populate("book");
    return books;
  } catch (error) {
    throw error;
  }
};

exports.getCart = async (req, res) => {
  try {
    const books = await readBooksFromCart();
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

// Function to seed book to cart db
const seedToCart = async (book) => {
  try {
    const bookToSeed = new CartBooks(book);
    const savedBook = await bookToSeed.save();
    await savedBook.populate("book");
    return savedBook;
  } catch (err) {
    throw err;
  }
};

exports.addToCart = async (req, res) => {
  try {
    const savedBook = await seedToCart(req.body);
    if (savedBook) {
      res
        .status(201)
        .json({ message: "Successfully added to cart.", savedBook: savedBook });
    } else {
      res.status(400).json({ message: "Failed to add in cart." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add in cart." });
  }
};

// Function to update book in cart db by Id
const updateBookInCart = async (bookId, bookToUpdate) => {
  try {
    const updatedBook = await CartBooks.findByIdAndUpdate(
      bookId,
      bookToUpdate,
      { new: true }
    );
    await updatedBook.populate("book");
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

exports.updateCart = async (req, res) => {
  const bookId = req.params.bookId;
  const book = req.body;

  try {
    const updatedBook = await updateBookInCart(bookId, book);
    if (updatedBook) {
      res.status(200).json({
        message: "Successfully updated book.",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ message: "No book found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update book." });
  }
};

// Function to delete book by id from cart db
const deleteBookFromCart = async (bookId) => {
    try {
      const deletedBook = await CartBooks.findByIdAndDelete(bookId);
      return deletedBook;
    } catch (err) {
      throw err;
    }
  };
  

exports.removeFromCart = async (req, res) => {
    try {
      const deletedBook = await deleteBookFromCart(req.params.bookId);
      if (deletedBook) {
        res.status(200).json({
          message: "Successfully deleted book from cart.",
          deletedBook: deletedBook,
        });
      } else {
        res.status(400).json({ message: "Failed to delete book from cart." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete book from cart." });
    }
  };
  