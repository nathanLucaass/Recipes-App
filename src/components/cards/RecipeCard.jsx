import PropTypes from 'prop-types';
import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ data, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card">
      <p
        data-testid={ `${index}-card-name` }
        className="card-name"

      >
        {data.strMeal || data.strDrink}

      </p>
      <img
        className="recipe-img"
        data-testid={ `${index}-card-img` }
        src={ data.strMealThumb || data.strDrinkThumb }
        alt={ data.strMeal || data.strDrink }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  data: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;
