import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom/';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByCategory } from '../redux/actions';
import './Categories.css';

export default function Categories({ categories }) {
  const { filteredByCategory } = useSelector((state) => state.recipes);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleClear = () => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    dispatch(fetchRecipesByCategory(pathname === '/drinks'
      ? urlDrinks : urlMeals, true));
  };

  const handleClick = (categoryType) => {
    const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryType}`;
    const urlMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryType}`;

    if (filteredByCategory) {
      dispatch(fetchRecipesByCategory(pathname === '/drinks'
        ? urlDrinks : urlMeals, false));
    } else {
      handleClear();
    }
  };

  return (
    <div className="categories">
      { categories && categories.map(({ strCategory }) => (
        <div key={ strCategory }>
          <button
            className="category-button"
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>
        </div>))}
      <button
        type="button"
        className="category-button"
        data-testid="All-category-filter"
        onClick={ handleClear }
      >
        All
      </button>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
