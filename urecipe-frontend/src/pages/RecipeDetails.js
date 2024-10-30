import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the specific recipe based on the ID
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

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Add other details like ingredients, comments, etc. */}
    </div>
  );
}

export default RecipeDetails;
