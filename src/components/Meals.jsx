import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import RecipeCard from './cards/RecipeCard';
import { fetchRecipes } from '../redux/actions';

export default function Meals({ data }) {
  const dispatch = useDispatch();
  const { filteredByCategory, searched } = useSelector(
    (state) => state.recipes,
  );
  const values = Object.values(data);
  const verification = values.every((value) => value !== null);
  let meals = [];

  if (searched && !verification) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    dispatch(fetchRecipes(mealsUrl));
    return null;
  }

  if (data.meals) {
    meals = data.meals;
  }

  if (meals.length === 1 && filteredByCategory) {
    return <Redirect to={ `/meals/${meals[0].idMeal}` } />;
  }
  return (
    <div className="meals">
      {meals.length > 0
        && meals.map((meal, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
                <RecipeCard data={ meal } index={ index } />
              </Link>
            );
          }
          return null;
        })}
    </div>
  );
}

Meals.propTypes = {
  data: PropTypes.shape({
    meals: PropTypes.shape({
      idMeal: PropTypes.string,
    }),
  }),
}.isRequired;
