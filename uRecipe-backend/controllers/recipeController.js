const Recipe = require('../models/Recipe');

// Delete Recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this recipe' });
    }

    await recipe.remove();
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe' });
  }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, tags, preparationTime, description } = req.body;
  try {
    // Validate that all required fields are present
    if (!title || !ingredients || !preparationTime || !description) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create and save the new recipe
    const newRecipe = new Recipe({
      title,
      ingredients,
      tags,
      preparationTime,
      description,
      createdBy: req.user.id // Link the recipe to the user who created it
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Error creating recipe' });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById
};
