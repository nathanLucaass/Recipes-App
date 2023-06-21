import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import { refreshFavorites } from '../../redux/actions';

export default function FavoriteBtn({ data, testID = 'favorite-btn' }) {
  const dispatch = useDispatch();
  const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const id = data.idMeal || data.idDrink || data.id;

  const INITIAL_STATE = favoriteRecipesLS.some((recipe) => recipe.id === id);

  const [favorite, setFavorite] = useState(INITIAL_STATE);

  useEffect(() => {
    setFavorite(INITIAL_STATE);
  }, [INITIAL_STATE]);

  const handleClick = () => {
    const recipe = {
      id: data.idMeal || data.idDrink || data.id,
      type: data.idMeal || data.type === 'meal' ? 'meal' : 'drink',
      nationality: data.strArea || data.nationality || '',
      category: data.strCategory || data.category,
      alcoholicOrNot: data.strAlcoholic || data.alcoholicOrNot || '',
      name: data.strMeal || data.strDrink || data.name,
      image: data.strMealThumb || data.strDrinkThumb || data.image,
    };

    if (favoriteRecipesLS.some((recipeLS) => recipeLS.id === id)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          favoriteRecipesLS.filter((favoriteLS) => favoriteLS.id !== id),
        ),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipesLS, recipe]),
      );
    }
    setFavorite(!favorite);
    dispatch(refreshFavorites());
  };

  return (
    <div className="sharingBtn">
      <button
        className="favorite-btn"
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ favorite ? blackHeart : whiteHeart }
          alt="Heart"
          data-testid={ testID }
        />
      </button>
    </div>
  );
}

FavoriteBtn.propTypes = {
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
  }),
}.isRequired;
