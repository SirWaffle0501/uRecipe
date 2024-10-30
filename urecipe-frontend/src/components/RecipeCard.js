import React from 'react';
import recipeService from '../services/recipeService';

function RecipeCard({ recipe }) {
  const userRole = localStorage.getItem('userRole');

  const handleDelete = async () => {
    try {
      await recipeService.deleteRecipe(recipe._id);
      alert('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe.');
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      {userRole === 'admin' && <button onClick={handleDelete}>Delete Recipe</button>}
    </div>
  );
}

export default RecipeCard;
