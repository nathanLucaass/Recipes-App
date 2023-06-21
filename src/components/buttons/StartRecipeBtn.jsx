import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom/';
import '../../pages/RecipeDetails.css';

export default function StartRecipeBtn({ id }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressLS = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) || {
    drinks: {},
    meals: {},
  };

  const inProgressKey = inProgressLS.drinks || inProgressLS.meals;

  let doneVerification = false;
  let inProgressVerification = false;

  if (doneRecipes.length > 0) {
    doneVerification = doneRecipes.some((item) => item.id === id);
  }

  inProgressVerification = Object.keys(inProgressKey).some(
    (item) => item === id,
  );

  const handleClick = () => {
    history.push(
      pathname.includes('drinks')
        ? `/drinks/${id}/in-progress`
        : `/meals/${id}/in-progress`,
    );
  };

  return (
    <div className="btn-init">
      {!doneVerification && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="startRecipe"
          onClick={ handleClick }
        >
          {inProgressVerification ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

StartRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
