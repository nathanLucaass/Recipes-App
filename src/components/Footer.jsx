import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import meal from '../images/dinner_dining_FILL0_wght400_GRAD0_opsz48.png';
import drink from '../images/drinkIcon.svg';
import { fetchCategories, fetchRecipesByCategory } from '../redux/actions';

function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <section className="footer-section">
      <footer data-testid="footer">
        <button
          type="button"
          onClick={ () => {
            const urlMealsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
            const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

            dispatch(fetchCategories(urlMealsCategories));
            dispatch(fetchRecipesByCategory(urlMeals, true));
            history.push('/meals');
          } }
        >
          <img
            data-testid="meals-bottom-btn"
            className="meals-icon"
            src={ meal }
            alt="food"
          />
        </button>
        <button
          type="button"
          onClick={ () => {
            const urlDrinksCategories = 'https://www.thecocktaildb.com/stapi/json/v1/1/list.php?c=li';
            const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

            dispatch(fetchCategories(urlDrinksCategories));
            dispatch(fetchRecipesByCategory(urlDrinks, true));
            history.push('/drinks');
          } }
        >
          <img data-testid="drinks-bottom-btn" src={ drink } alt="drink" />
        </button>
      </footer>
    </section>
  );
}
export default Footer;
