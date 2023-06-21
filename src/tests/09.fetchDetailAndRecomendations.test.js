const { waitFor } = require('@testing-library/react');
const fetch = require('../../cypress/mocks/fetch');
const { default: App } = require('../App');
const { default: renderWithRouterAndRedux } = require('./helpers/renderWithRouterAndRedux');

describe('testa a função fetchDetailAndRecommendations', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    jest.spyOn(console, 'log');
    console.log.mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa as recomendações de comidas', async () => {
    renderWithRouterAndRedux(<App />, {
      route: '/meals/52771/',
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

    expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('testa as recomendações de bebidas', async () => {
    renderWithRouterAndRedux(<App />, {
      route: '/drinks/15997/',
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');

    expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('testa log de erro', async () => {
    renderWithRouterAndRedux(<App />, {
      route: '/drinks/xxxxx/',
    });

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
