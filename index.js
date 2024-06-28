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
    console.log(savedBook);
  } catch (error) {
    throw error;
  }
};

seedBooks();

// Listiening to the port for HTTP requests
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
