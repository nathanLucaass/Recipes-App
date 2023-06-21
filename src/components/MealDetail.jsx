import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailsAndRecommendations } from '../redux/actions';
import RecommendationCard from './cards/RecommendationCard';
import StartRecipeBtn from './buttons/StartRecipeBtn';
import ShareBtn from './buttons/ShareBtn';
import FavoriteBtn from './buttons/FavoriteBtn';
import '../pages/RecipeDetails.css';

export default function MealDetail({ id }) {
  const dispatch = useDispatch();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
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
        src={ details.strMealThumb }
        alt={ details.strMeal }
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      <header className="header-details">
        <h1 className="recipe-title" data-testid="recipe-title">{details.strMeal}</h1>
        <h3
          className="recipe-categorie"
          data-testid="recipe-categorie"
        >
          {details.strCategory}

        </h3>
      </header>
      <div className="ingredients">
        <ul className="recipe-itens">
          {ingredientsKeys.length > 0
          && measuresKeys.length > 0
          && ingredientsKeys.map((key, index) => (details[key] !== '' ? (
            <li
              key={ key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${details[key]} - ${details[measuresKeys[index]]}`}
            </li>
          ) : null))}
        </ul>
      </div>
      <div>
        <p
          data-testid="instructions"
          className="instructions"
        >
          {details.strInstructions}

        </p>

        <div className="share-and-favorite-btn">
          <ShareBtn />
          <FavoriteBtn data={ details } />
        </div>

        <iframe
          src={ details.strYoutube && details.strYoutube.replace('watch?v=', 'embed/') }
          width="560"
          height="315"
          title={ details.strMeal }
          data-testid="video"
          className="video"
        />
      </div>
      <div className="recommendation">
        {recommendations.map((item, index) => (
          <RecommendationCard key={ index } data={ item } index={ index } />
        ))}
      </div>
      <div className="start-btn">
        <StartRecipeBtn id={ id } start-btn className="start-btn" />
      </div>
    </div>
  );
}

MealDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
