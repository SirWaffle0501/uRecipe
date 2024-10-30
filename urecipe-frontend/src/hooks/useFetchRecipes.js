// hooks/useFetchRecipes.js
import { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';

const useFetchRecipes = (filters) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeService.getFilteredRecipes(filters);
        setRecipes(response);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [filters]);

  return recipes;
};

export default useFetchRecipes;