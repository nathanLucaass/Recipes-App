import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Recipes da aplicação', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa navegação dos menus de categorias', async () => {
    renderWithRouterAndRedux(<App />);
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    await screen.findByText('Timbits');
    const beefCategory = screen.getByTestId('Beef-category-filter');
    userEvent.click(beefCategory);
    await screen.findByText('Beef and Mustard Pie');
    userEvent.click(beefCategory);
    await screen.findByText('Timbits');

    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
    await screen.findByText('GG');

    const shakeCategory = screen.getByRole('button', { name: /shake/i });
    userEvent.click(shakeCategory);
    await screen.findByText('Avalanche');
    userEvent.click(shakeCategory);
    await screen.findByText('GG');

    const allCategory = screen.getByRole('button', { name: /all/i });
    userEvent.click(allCategory);
    await screen.findByText('GG');
  });
});
