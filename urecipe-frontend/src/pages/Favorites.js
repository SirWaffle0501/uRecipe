// pages/Favorites.js
import React from 'react';
import useAuth from '../hooks/useAuth';
import RecipeCard from '../components/RecipeCard';

function Favorites() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your favorite recipes.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      {user.favorites && user.favorites.length > 0 ? (
        user.favorites.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
}

export default Favorites;