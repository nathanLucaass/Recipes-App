// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { useDispatch, useSelector } from 'react-redux';
// import MealDetail from '../components/MealDetail';
// import { fetchDetailsAndRecommendations } from '../redux/actions';

import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
// // Falta Testar a linha 15

// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// jest.mock('../redux/actions', () => ({
//   fetchDetailsAndRecommendations: jest.fn(),
// }));

// describe('MealDetail', () => {
//   const dispatch = jest.fn();
//   const mockUseDispatch = useDispatch;
//   const mockUseSelector = useSelector;
//   const mockFetchDetailsAndRecommendations = fetchDetailsAndRecommendations;

//   beforeEach(() => {
//     mockUseDispatch.mockReturnValue(dispatch);
//     mockUseSelector.mockReturnValue({
//       details: {
//         strMealThumb: 'meal-thumbnail.jpg',
//         strMeal: 'Meal Name',
//         strCategory: 'Meal Category',
//         strInstructions: 'Meal Instructions',
//         strYoutube: 'https://www.youtube.com/watch?v=abc123',
//         strIngredient1: 'Ingredient 1',
//         strIngredient2: 'Ingredient 2',
//         strMeasure1: 'Measure 1',
//         strMeasure2: 'Measure 2',
//       },
//       recommendations: [
//         { id: 1, name: 'Recommendation 1' },
//         { id: 2, name: 'Recommendation 2' },
//       ],
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('Renderiza o MealDetail', () => {
//     render(<MealDetail id="123" />);
//     expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
//     expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
//     expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
//     expect(screen.getByTestId('instructions')).toBeInTheDocument();
//     expect(screen.getByTestId('video')).toBeInTheDocument();
//     expect(screen.getByTestId('ingredient-name-and-measure')).toBeInTheDocument();
//     expect(screen.getByTestId('video')).toHaveAttribute('src', 'https://www.youtube.com/watch?v=abc123');
//     expect(screen.getAllByTestId('recommendation-card')).toHaveLength(2);
//   });

//   it('Faz o fetch', () => {
//     render(<MealDetail id="123" />);
//     expect(mockFetchDetailsAndRecommendations).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=123');
//     expect(dispatch).toHaveBeenCalledWith(mockFetchDetailsAndRecommendations('https://www.themealdb.com/api/json/v1/1/lookup.php?i=123'));
//   });

//   it('Renderiza a lista de ingredientes', () => {
//     render(<MealDetail id="123" />);
//     expect(screen.getByText('Ingredient 1 - Measure 1')).toBeInTheDocument();
//     expect(screen.getByText('Ingredient 2 - Measure 2')).toBeInTheDocument();
//   });

//   it('StartRecipeBtn', () => {
//     render(<MealDetail id="123" />);
//     const startButton = screen.getByTestId('start-recipe-button');
//     userEvent.click(startButton);
//     expect(dispatch).toHaveBeenCalledWith({ type: 'START_RECIPE', payload: { id: '123' } });
//   });
// });
const urlMealsSearch = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const urlDrinksSearch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlGG = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';

describe('Testa a página de detalhes da aplicação', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByTestId('login-submit-btn');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    act(() => {
      userEvent.type(email, 'user@user.com');
      userEvent.type(password, 'strongPassword.com');
    });

    await waitFor(() => {
      act(() => {
        userEvent.click(btn);
      });
      expect(global.fetch).toHaveBeenCalledWith(urlMeals && urlMealsSearch);
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
  });
  it('Deve renderizar a página de detalhes de comida corretamente', async () => {
    const corba = screen.getByAltText(/corba/i);
    expect(corba).toBeInTheDocument();

    act(() => {
      userEvent.click(corba);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      const recipeCategory = screen.getByText(/vegetarian/i);
      expect(recipeCategory).toBeInTheDocument();
    });
    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const firstIngredient = screen.getByText(/penne rigate/i);
    expect(firstIngredient).toBeInTheDocument();
    const instructions = screen.getByText(/Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta./i);
    expect(instructions).toBeInTheDocument();
    const drinkRecommendation = screen.getByAltText(/GG/i);
    expect(drinkRecommendation).toBeInTheDocument();
    const shareBtn = screen.getByAltText(/shareBtn/i);
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = screen.getByAltText(/heart/i);
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    const startRecipeBtn = screen.getByText(/start recipe/i);
    expect(startRecipeBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(favoriteBtn);
    });
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
  it('Deve renderizar a página de detalhes de drink corretamente', () => {
    const corba = screen.getByAltText(/corba/i);
    expect(corba).toBeInTheDocument();
    const drinks = screen.getByAltText(/drink/i);
    expect(drinks).toBeInTheDocument();

    act(() => {
      userEvent.click(drinks);
      expect(global.fetch).toHaveBeenCalledWith(urlDrinks && urlDrinksSearch);
    });

    waitFor(() => {
      const drinksTitle = screen.getByRole('heading', { name: /drinks/i });
      expect(drinksTitle).toBeInTheDocument();
      const GG = screen.getByAltText(/GG/i);
      expect(GG).toBeInTheDocument();
      act(() => {
        userEvent.click(GG);
      });
      expect(global.fetch).toHaveBeenCalledWith(urlGG);
    });

    waitFor(() => {
      const recipeCategory = screen.getByRole('heading', { name: /optional alcohol/i });
      expect(recipeCategory).toBeInTheDocument();
      const secondIngredient = screen.getByText(/ginger ale/i);
      expect(secondIngredient).toBeInTheDocument();
      const instructions = screen.getByText(/pour the galliano liqueur over ice\. fill the remainder of the glass with ginger ale and thats all there is to it\. you now have a your very own gg\./i);
      expect(instructions).toBeInTheDocument();
      const foodRecommendation = screen.getByAltText(/sushi/i);
      expect(foodRecommendation).toBeInTheDocument();
    });

    waitFor(() => {
      const startRecipeBtn = screen.getByText(/start recipe/i);
      expect(startRecipeBtn).toBeInTheDocument();
      act(() => {
        userEvent.click(startRecipeBtn);
      });
      const drinkCategory = screen.getByRole('heading', { name: /ordinary drink/i });
      expect(drinkCategory).toBeInTheDocument();
      const ingredientAndMeasure = screen.getByText(/1 1\/2 oz galliano/i);
      expect(ingredientAndMeasure).toBeInTheDocument();
      const finishRecipeBtn = screen.getByText(/finish recipe/i);
      expect(finishRecipeBtn).not.toBeDisabled();
      act(() => {
        userEvent.click(finishRecipeBtn);
      });
    });
  });
});
