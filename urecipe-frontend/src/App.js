import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
