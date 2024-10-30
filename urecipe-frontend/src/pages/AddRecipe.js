import React, { useState } from 'react';
import recipeService from '../services/recipeService';
import TagSelector from '../components/TagSelector';
import RatingStars from '../components/RatingStars';

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleTagSelect = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecipe = { title, ingredients: ingredients.split(','), tags, description, rating };
      await recipeService.addRecipe(newRecipe);
      alert('Recipe added successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Ingredients (comma separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      <TagSelector availableTags={['Vegan', 'Italian', 'Dessert']} selectedTags={tags} onTagSelect={handleTagSelect} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <RatingStars onRate={setRating} />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipe;
