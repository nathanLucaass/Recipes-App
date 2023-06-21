import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import DoneRecipeCard from '../components/cards/DoneRecipeCard';

export default function DoneRecipes() {
  const { refreshFavorite } = useSelector((state) => state.recipes);
  const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesLS);

  const handleFilter = (filter) => {
    setFavoriteRecipes(favoriteRecipesLS);
    if (filter !== 'all') {
      setFavoriteRecipes(favoriteRecipesLS.filter((recipe) => recipe.type === filter));
    }
  };

  useEffect(() => {
    setFavoriteRecipes(favoriteRecipesLS);
  }, [refreshFavorite]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => handleFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>
      {favoriteRecipes.map((recipe, index) => (
        <DoneRecipeCard
          key={ recipe.id + index }
          recipe={ recipe }
          index={ index }
          favoritePage
        />
      ))}
    </div>
  );
}
