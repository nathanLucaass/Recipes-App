import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Tests if the Profile page renders all elements correctly', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shoud save e-mail into localStorage and preserve data untill logout', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    // Login into homepage and goes to /meals path.
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    act(() => {
      userEvent.type(emailInput, 'palmeiras@maiordobrasil.com');
      userEvent.type(passwordInput, 'avantiPales7ra');
    });

    // After logged, it tests navigation through Profile Page.
    await waitFor(() => {
      userEvent.click(loginBtn);
      expect(history.location.pathname).toBe('/meals');
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      expect(screen.getByText('palmeiras@maiordobrasil.com'));

      const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
      userEvent.click(doneRecipesBtn);
      expect(history.location.pathname).toBe('/done-recipes');
    });

    // After went to Done Recipes page, go back to Profile and, after that, goes to Favorite Recipes page.
    await waitFor(() => {
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);

      const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
      userEvent.click(favoriteRecipesBtn);
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

    act(() => {
      history.goBack();
    });
    // Now it tests if Logout button is working and cleaning up localStorage
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    await waitFor(() => {
      userEvent.click(logoutBtn);
      expect(window.localStorage.getItem('user')).toBeFalsy();
    });
  });
});
