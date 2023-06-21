import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Footer Test', () => {
  it('element Footer.jsx verification', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/profile');
    });
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const MealBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    expect(MealBtn).toBeInTheDocument();
    userEvent.click(MealBtn);
    expect(history.location.pathname).toBe('/meals');
    act(() => {
      history.goBack();
    });
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });
});
