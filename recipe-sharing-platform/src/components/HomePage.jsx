import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-600 mb-4">{recipe.summary}</p>
            <a href={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
