import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/cards/DoneRecipeCard';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipes, setDoneRecipes] = useState(doneRecipesLS);

  const handleFilter = (filter) => {
    setDoneRecipes(doneRecipesLS);
    if (filter !== 'all') {
      setDoneRecipes(doneRecipesLS.filter((recipe) => recipe.type === filter));
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div className="finish-filters">
        <button
          className="filter-btn"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          className="filter-btn"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => handleFilter('meal') }
        >
          Meals
        </button>
        <button
          className="filter-btn"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="done">
        {doneRecipes.map((recipe, index) => (
          <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
      </div>
    </div>
  );
}
