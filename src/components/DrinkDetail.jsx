import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailsAndRecommendations } from '../redux/actions';
import RecommendationCard from './cards/RecommendationCard';
import StartRecipeBtn from './buttons/StartRecipeBtn';
import ShareBtn from './buttons/ShareBtn';
import FavoriteBtn from './buttons/FavoriteBtn';
import '../pages/RecipeDetails.css';

export default function DrinkDetail({ id }) {
  const dispatch = useDispatch();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    dispatch(fetchDetailsAndRecommendations(url));
  }, []);
  const { details, recommendations } = useSelector((state) => state.recipes);
  let ingredientsKeys = [];
  let measuresKeys = [];

  if (details) {
    ingredientsKeys = Object.keys(details).filter((key) => key.includes('Ingredient'));
    measuresKeys = Object.keys(details).filter((key) => key.includes('Measure'));
  }

  return (
    <div className="details-component">
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        data-testid="recipe-photo"
        className="drink-photo"
      />
      <header className="header-details">
        <h1 data-testid="recipe-title" className="recipe-title">{details.strDrink}</h1>
        <h3
          data-testid="recipe-category"
          className="recipe-categorie"
        >
          {details.strAlcoholic}

        </h3>
      </header>
      <div className="ingredients">
        <ul>
          {ingredientsKeys.length > 0
          && measuresKeys.length > 0
          && ingredientsKeys.map((key, index) => (details[key] !== null ? (
            <li
              key={ key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${details[key]} ${
                details[measuresKeys[index]] !== null
                  ? `- ${details[measuresKeys[index]]}`
                  : ''
              }`}
            </li>
          ) : null))}
        </ul>
      </div>
      <div className="instructions">
        <p data-testid="instructions">{details.strInstructions}</p>
      </div>
      <div className="recommendation">
        {recommendations.map((item, index) => (
          <RecommendationCard key={ index } data={ item } index={ index } />
        ))}
      </div>
      <div className="share-and-favorite-btn">
        <ShareBtn />
        <FavoriteBtn data={ details } />
      </div>
      <div className="start-btn">
        <StartRecipeBtn id={ id } />
      </div>
    </div>
  );
}

DrinkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
