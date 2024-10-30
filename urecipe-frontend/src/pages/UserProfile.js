// pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';

function UserProfile() {
  const { userId } = useParams();
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await recipeService.getUserRecipes(userId);
        setUserRecipes(response);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  return (
    <div>
      <h2>User Recipes</h2>
      {userRecipes.length > 0 ? (
        userRecipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
      ) : (
        <p>No recipes found for this user.</p>
      )}
    </div>
  );
}

export default UserProfile;