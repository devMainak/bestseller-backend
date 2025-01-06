const BooksCategories = require("../models/booksCategories.model");

// Function to seed books category in DB
const seedCategories = async (category) => {
  try {
    const categoryToSave = new BooksCategories(category);
    const savedCategory = await categoryToSave.save();
    return savedCategory;
  } catch (error) {
    throw error;
  }
};

exports.createCategory = async (req, res) => {
  try {
    const savedCategory = await seedCategories(req.body);
    if (savedCategory) {
      res.status(201).json({
        message: "Category saved successfully.",
        savedCategory: savedCategory,
      });
    } else {
      res
        .status(400)
        .json({ message: "Some error occured while saving new category." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save new category" });
  }
};

// Function to read all categories
const readAllCategories = async () => {
  try {
    const categories = await BooksCategories.find();
    return categories;
  } catch (err) {
    throw err;
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await readAllCategories();
    if (categories.length > 0) {
      res.status(200).json({ data: { categories: categories } });
    } else {
      res.status(404).json({ message: "No categories found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load categories." });
  }
};

// Function to read category by _Id:
const readCategoryById = async (categoryId) => {
  try {
    const categoryById = await BooksCategories.findById(categoryId);
    return categoryById;
  } catch (err) {
    throw err;
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await readCategoryById(req.params.categoryId);
    if (category) {
      res.status(200).json({ data: { category: category } });
    } else {
      res.status(404).json({ message: "No category found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load category." });
  }
};
