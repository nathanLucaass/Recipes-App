import { act, screen, waitFor } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa pagina de receitas em progresso', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se a pagina de receitas de uma bebida em progresso é exibida', async () => {
    renderWithRouterAndRedux(<App />, {
      route: '/drinks/15997/in-progress',
    });
    const img = await screen.findByAltText('GG');
    const h1 = await screen.findByRole('heading', {
      level: 1,
    });
    const h2 = await screen.findByRole('heading', {
      level: 2,
    });
    const h3 = await screen.findByRole('heading', {
      level: 3,
    });
    const buttons = await screen.findAllByRole('button');
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(img).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
    expect(buttons).toHaveLength(3);
    expect(checkboxes).toHaveLength(1);
  });

  it('testa o fetch na url correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      route: '/drinks/15997/in-progress',
    });
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
    expect(global.fetch).toHaveBeenCalledWith(drinkUrl);
    act(() => {
      history.push('/meals/52771/in-progress');
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    });
  });
});
