// pages/EditRecipe.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';

function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeService.getRecipeById(id);
        setRecipe(response);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.updateRecipe(id, recipe);
      alert('Recipe updated successfully!');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={recipe.title} onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} />
      <input type="text" value={recipe.ingredients.join(',')} onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split(',') })} />
      <input type="text" value={recipe.tags.join(',')} onChange={(e) => setRecipe({ ...recipe, tags: e.target.value.split(',') })} />
      <textarea value={recipe.description} onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} />
      <button type="submit">Update Recipe</button>
    </form>
  );
}

export default EditRecipe;