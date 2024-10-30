import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

// Get filtered recipes based on ingredients, tags, and sorting options
const getFilteredRecipes = async ({ sort, ingredients, tags }) => {
  try {
    const response = await axios.get(`${API_URL}?sort=${sort}&ingredients=${ingredients}&tags=${tags}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered recipes:', error);
    throw error;
  }
};

// Add more functions for other CRUD operations as needed

export default {
  getFilteredRecipes,
};
