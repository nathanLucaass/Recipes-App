import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import FavoriteBtn from '../components/buttons/FavoriteBtn';
import FinishBtn from '../components/buttons/FinishBtn';
import ShareBtn from '../components/buttons/ShareBtn';
import { fetchDetailsAndRecommendations } from '../redux/actions';
import IngredientsCheckbox from '../components/IngredientsCheckbox';
import './RecipeInProgress.css';
import BackButton from '../components/buttons/BackBtn';

function RecipeInProgress() {
  const { idDaReceita } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`;

  if (pathname.includes('/drinks')) {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`;
  }

  useEffect(() => {
    dispatch(fetchDetailsAndRecommendations(url));
  }, []);
  const { details } = useSelector((state) => state.recipes);

  const [disabled, setDisabled] = useState(false);

  return (

    <div>
      <BackButton />
      <img
        src={ details.strMealThumb || details.strDrinkThumb }
        alt={ details.strMeal || details.strDrink }
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
        className="recipe-title"
      >
        {details.strMeal || details.strDrink}

      </h1>
      <h2
        data-testid="recipe-categor"
        className="recipecategor"
      >
        {details.strCategory}

      </h2>
      <h3
        data-testid="instructions-imporgress"
        className="instructions-imporgress"
      >
        {details.strInstructions}

      </h3>
      <IngredientsCheckbox
        id={ idDaReceita }
        details={ details }
        setDisabled={ setDisabled }

      />
      <div className="share-and-favorite-btn">
        <FavoriteBtn data={ details } />
        <ShareBtn id={ idDaReceita } />
      </div>
      <div className="finish-btn">
        <FinishBtn data={ details } disabled={ disabled } />
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
