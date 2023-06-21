import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './IngredientsCheckbox.css';

function IngredientsCheckbox({ details, id, setDisabled }) {
  const { pathname } = useLocation();
  const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    drinks: {
      [id]: [],
    },
    meals: {
      [id]: [],
    },
  };

  let key = 'meals';
  if (pathname.includes('drinks')) {
    key = 'drinks';
  }

  const INITIAL_STATE = ingredients[key][id] || [];

  const [checkedIngredient, setCheckedIngredient] = useState(INITIAL_STATE);

  let ingredientsKeys = [];
  let measuresKeys = [];
  let ingredientsList = [];

  if (details) {
    ingredientsKeys = Object.keys(details)
      .filter((detailsKey) => detailsKey.includes('Ingredient'));
    measuresKeys = Object.keys(details)
      .filter((detailsKey) => detailsKey.includes('Measure'));
  }

  const handleChecked = ({ target: { value, checked } }) => {
    if (checked) {
      setCheckedIngredient([...checkedIngredient, value]);
    } else {
      setCheckedIngredient(checkedIngredient.filter((item) => item !== value));
    }
  };

  if (ingredientsKeys.length > 0 && measuresKeys.length > 0) {
    ingredientsList = ingredientsKeys.map(
      (ingredient, index) => details[ingredient] !== null
        && details[ingredient] !== ''
        && details[measuresKeys[index]] !== null
        && details[measuresKeys[index]] !== ''
        && (
          <label
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            className={
              checkedIngredient.includes(details[ingredient])
                ? 'checkedIngredient'
                : ''
            }
          >
            <input
              type="checkbox"
              name={ details[ingredient] }
              id={ details[ingredient] }
              value={ details[ingredient] }
              onChange={ handleChecked }
              checked={ checkedIngredient.includes(details[ingredient]) }
            />
            <p
              className="ingredient-name"
            >
              {`${details[measuresKeys[index]]} ${details[ingredient]}`}
            </p>
          </label>
        ),
    );
  }

  const checkAllCheckboxes = () => {
    const length = ingredientsList.reduce(
      (acc, item) => (item !== false ? acc + 1 : acc),
      0,
    );
    const check = length === checkedIngredient.length;
    setDisabled(!check);
  };

  useEffect(() => {
    if (ingredients) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...ingredients,
          [key]: {
            ...ingredients[key],
            [id]: checkedIngredient,
          },
        }),
      );
    }
    checkAllCheckboxes();
  }, [checkedIngredient]);

  return (
    <div className="ingredients-check">
      <ul>{ingredientsList.length > 0 && ingredientsList}</ul>
    </div>
  );
}

IngredientsCheckbox.propTypes = {
  details: PropTypes.object,
}.isRequired;

export default IngredientsCheckbox;
