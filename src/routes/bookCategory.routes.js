const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
} = require("../controller/bookCategory.controller");
const router = express.Router();

// Routes for categories
router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:categoryId", getCategoryById);

module.exports = router;