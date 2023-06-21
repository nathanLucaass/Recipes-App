import PropTypes from 'prop-types';
import React from 'react';

export default function RecommendationCard({ data, index }) {
  return (
    <div data-testid={ `${index}-recommendation-card` } className="recipe-card">
      <p
        data-testid={ `${index}-recommendation-title` }
        className="card-name"
      >
        {data.strMeal || data.strDrink}

      </p>
      <img
        className="recipe-img"
        src={ data.strMealThumb || data.strDrinkThumb }
        alt={ data.strMeal || data.strDrink }
      />
    </div>
  );
}

RecommendationCard.propTypes = {
  data: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;
