const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { createRecipe, deleteRecipe, getAllRecipes, getRecipeById } = require('../controllers/recipeController');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Create a new recipe (Authenticated Users Only)
router.post('/', protect, createRecipe);

// Get all recipes with optional sorting (Authenticated Users Only)
router.get('/', protect, getAllRecipes);

// Get a recipe by ID (Authenticated Users Only)
router.get('/:id', protect, getRecipeById);

// Filter recipes by ingredients
router.get('/filter', protect, async (req, res) => {
  try {
    const { ingredients } = req.query;
    const ingredientList = ingredients ? ingredients.split(',') : [];

    let filter = {};
    if (ingredientList.length > 0) {
      filter.ingredients = { $all: ingredientList }; // Find recipes with all the selected ingredients
    }

    const recipes = await Recipe.find(filter);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching filtered recipes' });
  }
});

// Filter recipes by tags
router.get('/tags', protect, async (req, res) => {
  try {
    const { tags } = req.query;
    const tagList = tags ? tags.split(',') : [];

    let filter = {};
    if (tagList.length > 0) {
      filter.tags = { $in: tagList }; // Find recipes containing any of the specified tags
    }

    const recipes = await Recipe.find(filter);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes by tags' });
  }
});

// Get recipes with sorting options (Authenticated Users Only)
router.get('/sort', protect, async (req, res) => {
  try {
    const { sort } = req.query;

    let sortOption = {};
    if (sort === 'rating') {
      sortOption = { rating: -1 }; // Descending rating
    } else if (sort === 'date') {
      sortOption = { createdAt: -1 }; // Newest first
    } else if (sort === 'prepTime') {
      sortOption = { preparationTime: 1 }; // Shortest prep time first
    }

    const recipes = await Recipe.find().sort(sortOption);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sorted recipes' });
  }
});

// Delete Recipe (Admin Only)
router.delete('/:id', protect, admin, deleteRecipe);

module.exports = router;
