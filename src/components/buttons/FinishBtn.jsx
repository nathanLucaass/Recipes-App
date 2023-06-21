import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './FinishBtn.css';

function FinishBtn({ disabled, data }) {
  const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const history = useHistory();

  const handleClick = () => {
    const recipe = {
      id: data.idMeal || data.idDrink,
      type: data.idMeal ? 'meal' : 'drink',
      nationality: data.strArea || '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic || '',
      name: data.strMeal || data.strDrink,
      image: data.strMealThumb || data.strDrinkThumb,
      doneDate: new Date(),
      tags: data.strTags ? data.strTags.split(',') : [],
    };

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipesLS, recipe]),
    );

    history.push('/done-recipes');
  };

  return (
    <button
      disabled={ disabled }
      type="button"
      onClick={ handleClick }
      data-testid="finish-recipe-btn"
      className="finish-recipe-btn"
    >
      Finish Recipe
    </button>
  );
}

FinishBtn.propTypes = {
  data: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strTags: PropTypes.shape({
      split: PropTypes.func,
    }),
  }),
  disabled: PropTypes.bool,
}.isRequired;

export default FinishBtn;
