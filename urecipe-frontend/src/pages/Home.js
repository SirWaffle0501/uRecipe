import React, { useState, useEffect, useCallback } from 'react';
import recipeService from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import IngredientCheckbox from '../components/IngredientCheckbox';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [ingredients] = useState(['Tomato', 'Garlic', 'Chicken', 'Onion', 'Salt']); // Example ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allTags] = useState(['Vegan', 'Gluten-Free', 'Dessert', 'Quick']); // Example tags
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchFilteredRecipes = useCallback(async () => {
    try {
      const ingredientQuery = selectedIngredients.join(',');
      const tagQuery = selectedTags.join(',');
      const response = await recipeService.getFilteredRecipes({ sort: sortOption, ingredients: ingredientQuery, tags: tagQuery });
      setRecipes(response);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
    }
  }, [sortOption, selectedIngredients, selectedTags]);

  useEffect(() => {
    fetchFilteredRecipes();
  }, [fetchFilteredRecipes]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (allTags.includes(value) && !selectedTags.includes(value)) {
      setSelectedTags((prev) => [...prev, value]);
    }
  };

  return (
    <div>
      <h2>Filter by Ingredients</h2>
      <div className="ingredient-filters">
        {ingredients.map((ingredient) => (
          <IngredientCheckbox
            key={ingredient}
            ingredient={ingredient}
            isChecked={selectedIngredients.includes(ingredient)}
            onChange={handleIngredientChange}
          />
        ))}
      </div>

      <h2>Filter by Tags</h2>
      <input type="text" placeholder="Enter tag..." onChange={handleTagChange} list="tags-list" />
      <datalist id="tags-list">
        {allTags.map((tag, index) => (
          <option key={index} value={tag} />
        ))}
      </datalist>
      <div className="selected-tags">
        {selectedTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <h2>Sort by</h2>
      <select onChange={handleSortChange}>
        <option value="">Select...</option>
        <option value="rating">Highest Rating</option>
        <option value="date">Newest</option>
        <option value="prepTime">Preparation Time</option>
      </select>

      <h2>Recipe List</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
