const express = require("express");
const app = express();
const cors = require('cors')
const initializeDatabse = require("./db/db.connection");
const BooksData = require("./models/booksData.model");
const BooksCategories = require("./models/booksCategories.model");
const WishlistBooks = require("./models/wishlist.model")
const CartBooks = require("./models/cart.model")
const UserAddress = require("./models/userAdress.model")

// cors config
const corsOptions = {
  origin: "*",
  credentials: true
}

// Initializing DB connection
initializeDatabse();

// JSON parsing middleware implemented
app.use(express.json());

// cors implementation
app.use(cors(corsOptions))

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
     .json({message: "Some error occured while saving new category."})
   }
 } catch (err) {
   console.error(err)
   res.status(500)
   .json({error: "Failed to save new category"})
 }
})

// Function to seed categories in DB
const seedBooks = async (book) => {
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
      .json({message: "Some error occured while saving book."})
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
      .json({message: "No books found."})
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
      .json({message: "No Book Found."})
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
      .json({message: "No categories found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load categories."})
  }
})

// Function to read category by _Id:
const readCategoryById = async (categoryId) => {
  try {
    const categoryById = await BooksCategories.findById(categoryId)
    return categoryById
  } catch (err) {
    throw err
  }
}

// GET method on "/categories/:categoryId" to read category data by Id
app.get("/categories/:categoryId", async (req, res) => {
  try {
    const category = await readCategoryById(req.params.categoryId)
    if (category){
      res.status(200)
      .json({data: {category: category}})
    } else {
      res.status(404)
      .json({message: "No category found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load category."})
  } 
})

// Function to read all books from wishlist db
const readBookFromWishlist = async () => {
  try {
    const books = await WishlistBooks.find()
    return books
  } catch(error) {
    throw error
  }
}

// GET method on "/wishlist" route to read all books from wishlist
app.get("/wishlist", async (req, res) => {
  try {
    const books = await readBookFromWishlist()
    if (books.length > 0)
    {
      res.status(200)
      .json(books)
    } else {
      res.status(404)
      .json({message: "No book found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load books in wishlist."})
  }
})

// Function to seed data to wishlist db
const seedToWishlist = async (book) => {
  try {
    const bookToSeed = new WishlistBooks(book)
    const savedBook = bookToSeed.save()
    return savedBook
  } catch(err) {
    throw err
  }
}

// POST method on "/wishlist" to seed book to wishlist db
app.post("/wishlist", async (req, res) => {
  try {
    const savedBook = await seedToWishlist(req.body)
    if (savedBook)
    {
      res.status(201)
      .json({message: "Successfully added to wishlist", savedBook: savedBook})
    } else {
      res.status(400)
      .json({message: "Failed to add in wishlist."})
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to add in wishlist."})
  }
})

// Function to delete book by id from wishlist db
const deleteBookFromWishlist = async (bookId) => {
  try {
    const deletedBook = await WishlistBooks.findByIdAndDelete(bookId)
    return deletedBook
  } catch (err) {
    throw err
  }
}

// DELETE method on "/wishlist/:bookId"
app.delete("/wishlist/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBookFromWishlist(req.params.bookId)
    if (deletedBook) {
      res.status(200)
      .json({message: "Successfully deleted book form wishlist", deletedBook: deletedBook})
    } else {
      res.status(400)
      .json({message: "Failed to delete book from wishlist"})
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to delete book from wishlist"})
  }
})

// Function to read all books from cart db
const readBooksFromCart = async () => {
  try {
    const books = await CartBooks.find()
    return books
  } catch(error) {
    throw error
  }
}

// GET method on "/cart" route to read all books from wishlist
app.get("/cart", async (req, res) => {
  try {
    const books = await readBooksFromCart()
    if (books.length > 0)
    {
      res.status(200)
      .json(books)
    } else {
      res.status(404)
      .json({message: "No book found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to load books in wishlist."})
  }
})

// Function to seed book to cart db
const seedToCart = async (book) => {
  try {
    const bookToSeed = new CartBooks(book)
    const savedBook = bookToSeed.save()
    return savedBook
  } catch(err) {
    throw err
  }
}

// POST method on "/cart" to seed book to cart db
app.post("/cart", async (req, res) => {
  try {
    const savedBook = await seedToCart(req.body)
    if (savedBook)
    {
      res.status(201)
      .json({message: "Successfully added to cart.", savedBook: savedBook})
    } else {
      res.status(400)
      .json({message: "Failed to add in cart."})
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to add in cart."})
  }
})

// Function to update book in cart db by Id
const updateBookInCart = async (bookId, bookToUpdate) => {
  try {
    const updatedBook = await CartBooks.findByIdAndUpdate(bookId, bookToUpdate, {new: true})
    
    return updatedBook
  } catch(error) {
    throw error
  }
}

// PUT method on "/cart/:bookId" to update book data in cart
app.put("/cart/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  const book = req.body
  
  try {
    const updatedBook = await updateBookInCart(bookId, book)
    if (updatedBook){
      res.status(200)
      .json({message: "Successfully updated book.", updatedBook: updatedBook})
    } else {
      res.status(404)
      .json({message: "No book found!"})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to update book."})
  }
})

// Function to delete book by id from cart db
const deleteBookFromCart = async (bookId) => {
  try {
    const deletedBook = await CartBooks.findByIdAndDelete(bookId)
    return deletedBook
  } catch (err) {
    throw err
  }
}

// DELETE method on "/cart/:bookId"
app.delete("/cart/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBookFromCart(req.params.bookId)
    if (deletedBook) {
      res.status(200)
      .json({message: "Successfully deleted book from cart.", deletedBook: deletedBook})
    } else {
      res.status(400)
      .json({message: "Failed to delete book from cart."})
    }
  } catch(error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to delete book from cart."})
  }
})

// Function to read all the user addresses from db
const readUserAddresses = async () => {
  try {
    const addresses = await UserAddress.find()
    return addresses
  } catch (err) {
    throw err
  }
}

// GET method on "/user/address" route to read addresses
app.get("/user/address", async (req, res) => {
  try {
    const addresses = await readUserAddresses()
    if (addresses.length > 0)
    {
      res.status(200)
      .json(addresses)
    } else {
      res.status(404)
      .json({message: "No address found."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to read address"})
  }
})

// Function to add user address in db
const addUserAddress = async (address) => {
  try {
    const newAddress = new UserAddress(address)
    const savedAddress = await newAddress.save()
    return savedAddress
  } catch (err) {
    throw err
  }
}

// POST method on "/user/address" to add new address
app.post("/user/address", async (req, res) => {
  const newAddress = req.body
  
  try {
    const savedAddress = await addUserAddress(newAddress)
    if (savedAddress) {
      res.status(201)
      .json({message: "Saved address successfully.", savedAddress: savedAddress})
    } else {
      res.status(400)
      .json({message: "Failed to add new address."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to add new address."})
  }
})

// Function to update address in db
const updateUserAddress = async (addressId, address) => {
  try {
    const updatedAddress = await UserAddress.findByIdAndUpdate(addressId, address, {new : true})
    return updatedAddress
  } catch (err) {
    throw err
  }
}

// PUT method on "/user/address/:addressId" to update address
app.put("/user/address/:addressId", async (req, res) => {
  const editedAddress = req.body
  const addressId = req.params.addressId
  try {
    const updatedAddress = updateUserAddress(addressId, editedAddress)
    if (updatedAddress) {
      res.status(200)
      .json({message: "Updated address successfully.", updatedAddress: updatedAddress})
    } else {
      res.status(400)
      .json({message: "Failed to update address."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to update address."})
  }
})

// Function delete address by Id from db
const deleteUserAddress = async (addressId) => {
  try {
    const deletedAddress = await UserAddress.findByIdAndDelete(addressId)
    return deletedAddress
  } catch (err) {
    throw err
  }
}

// DELETE method on "/user/address/:addressId" to delete address by Id
app.delete("/user/address/:addressId", async (req, res) => {
  const addressId = req.params.addressId
  try {
    const deletedAddress = await deleteUserAddress(addressId)
    if (deletedAddress) {
      res.status(200)
      .json({message: "Deleted address successfully.", deletedAddress: deletedAddress})
    } else {
      res.status(400)
      .json({message: "Failed to delete address."})
    }
  } catch (error) {
    console.error(error)
    res.status(500)
    .json({error: "Failed to delete address."})
  }
})

// Listiening to the port for HTTP requests
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
