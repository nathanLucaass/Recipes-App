import PropTypes from 'prop-types';
import React from 'react';
// import shareIcon from '../../images/shareIcon.svg';
import { Link } from 'react-router-dom/';
import ShareBtn from '../buttons/ShareBtn';
import FavoriteBtn from '../buttons/FavoriteBtn';
import './DoneRecipeCard.css';

export default function DoneRecipeCard({ recipe, index, favoritePage = false }) {
  const {
    id,
    name,
    image,
    category,
    doneDate = '',
    tags = [],
    type,
    nationality,
    alcoholicOrNot,
  } = recipe;

  const path = type === 'meal' ? `/meals/${id}` : `/drinks/${id}`;

  return (
    <div className="done-recipe-card">
      <Link to={ path }>
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      </Link>
      <Link to={ path }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="done-recipe-img"
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>

      <br />
      {tags.length > 0 && !favoritePage && tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </p>
      ))}
      <br />
      {!favoritePage
      && <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>}
      <ShareBtn
        id={ id }
        testID={ `${index}-horizontal-share-btn` }
        donePage
      />

      {favoritePage && (
        <FavoriteBtn data={ recipe } testID={ `${index}-horizontal-favorite-btn` } />
      )}

    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.any,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func,
    }),
  }),
}.isRequired;
