import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

export default function SearchBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    search: '',
    searchRadio: 'ingredients',
  });

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    let url = '';
    if (pathname === '/drinks') {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/';
    } else {
      url = 'https://www.themealdb.com/api/json/v1/1/';
    }

    switch (form.searchRadio) {
    case 'firstLetter':
      if (form.search.length !== 1) {
        global.alert(
          'Your search must have only 1 (one) character',
        );
      } else {
        url += `search.php?f=${form.search}`;
      }
      break;

    case 'name':
      url += `search.php?s=${form.search}`;
      break;

    default:
      url += `filter.php?i=${form.search}`;
      break;
    }

    dispatch(fetchRecipes(url));
  };

  const { search, searchRadio } = form;

  return (
    <form>

      <input
        placeholder="Search"
        name="search"
        data-testid="search-input"
        onChange={ handleChange }
        value={ search }
        className="search-input"
      />
      <div className="rabio-opts">
        <input
          className="radio-input"
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchRadio"
          id="ingredients"
          value="ingredients"
          onChange={ handleChange }
          checked={ searchRadio === 'ingredients' }
        />
        <label htmlFor="ingredients" className="label-opt">Ingredients</label>

        <input
          className="radio-input"
          type="radio"
          data-testid="name-search-radio"
          name="searchRadio"
          id="name"
          value="name"
          onChange={ handleChange }
          checked={ searchRadio === 'name' }
        />
        <label htmlFor="name" className="label-opt">Name</label>

        <input
          className="radio-input"
          type="radio"
          name="searchRadio"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleChange }
          checked={ searchRadio === 'firstLetter' }
        />
        <label htmlFor="firstLetter" className="label-opt">First Letter</label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
        className="search-btn"
      >
        Search
      </button>
    </form>
  );
}
