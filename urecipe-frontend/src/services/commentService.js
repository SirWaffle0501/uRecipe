// services/commentService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/comments';

// Add a new comment
const addComment = async (recipeId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/${recipeId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Get comments for a recipe
const getCommentsByRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export default {
  addComment,
  getCommentsByRecipe,
};