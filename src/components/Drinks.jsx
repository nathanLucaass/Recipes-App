import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Link } from 'react-router-dom/';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './cards/RecipeCard';
import { fetchRecipes } from '../redux/actions';

export default function Drinks({ data }) {
  const dispatch = useDispatch();
  const { filteredByCategory, searched } = useSelector(
    (state) => state.recipes,
  );
  const values = Object.values(data);
  const verification = values.every((value) => value !== null);
  let drinks = [];

  if (searched && !verification) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    dispatch(fetchRecipes(urlDrinks));

    return null;
  }

  if (data.drinks) {
    drinks = data.drinks;
  }

  if (drinks.length === 1 && filteredByCategory) {
    return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
  }

  return (
    <div className="drinks">
      {drinks.length > 0
        && drinks.map((drink, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
                <RecipeCard data={ drink } index={ index } />
              </Link>
            );
          }
          return null;
        })}
    </div>
  );
}

Drinks.propTypes = {
  data: PropTypes.shape({
    drinks: PropTypes.shape({
      idDrink: PropTypes.string,
    }),
  }),
}.isRequired;
