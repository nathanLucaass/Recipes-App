import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import App from '../App';

describe('Teste o componente DrinkDetail', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa renderização dos componentes dentro de DrinkDetail', async () => {
    renderWithRouterAndRedux(<App />);
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByText('GG');
    const drink = screen.getByRole('img', {
      name: /gg/i,
    });
    userEvent.click(drink);
    await screen.findByText('Ginger ale');

    const startRecipeBtn = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(startRecipeBtn);
    await screen.findByText(/glass with ginger ale/i);

    // userEvent.click(beefCategory);
    // await screen.findByText('Timbits');

    // const drinks = screen.getByTestId('drinks-bottom-btn');
    // userEvent.click(drinks);
    // await screen.findByText('GG');

    // const shakeCategory = screen.getByRole('button', { name: /shake/i });
    // userEvent.click(shakeCategory);
    // await screen.findByText('Avalanche');
    // userEvent.click(shakeCategory);
    // await screen.findByText('GG');

    // const allCategory = screen.getByRole('button', { name: /all/i });
    // userEvent.click(allCategory);
    // await screen.findByText('GG');
  });

  it('testa se o botão Start Recipe está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<App />);
    const { history, debug } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByText('GG');
    debug();
  });

  // it('testa se, caso o estado esteja com algum undefined, não renderiza DrinkDetail', async () => {
  //   renderWithRouterAndRedux(<App />);
  //   const { history, debug } = renderWithRouterAndRedux(
  //     <App />,
  //     { initialState: { recipes: { details: 'xablau' } } },
  //   );
  //   act(() => {
  //     history.push('/drinks');
  //   });

  //   const drinkGG = await screen.findByText('GG');
  //   expect(drinkGG).not.toBeInTheDocument();
  //   debug();
  // });
});
