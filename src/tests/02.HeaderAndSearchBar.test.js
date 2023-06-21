import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const searchInput = 'search-input';
const searchButton = 'exec-search-btn';
const mealsAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c';
const alertMessage = 'Your search must have only 1 (one) character';

describe('Testa os componentes Header e SearchBar da aplicação', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });
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
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
    const search = screen.getByTestId('search-top-btn');
    const profile = screen.getByAltText(/profile-icon/i);

    expect(search).toBeVisible();
    expect(profile).toBeInTheDocument();
    act(() => {
      userEvent.click(search);
    });
  });
  it('Deve filtrar por categoria corretamente', () => {
    const beef = screen.getByText(/beef/i);

    expect(beef).toBeInTheDocument();
    act(() => {
      userEvent.click(beef);
    });

    waitFor(() => {
      expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
    });
    const all = screen.getByText(/all/i);

    expect(all).toBeInTheDocument();
    act(() => {
      userEvent.click(all);
    });

    waitFor(() => {
      expect(screen.getByText(/burek/i)).toBeInTheDocument();
    });
  });
  it('Deve pesquisar por nome corretamente', () => {
    const name = screen.getByText(/name/i);
    const input = screen.getByTestId(searchInput);
    const searchBtn = screen.getByTestId(searchButton);

    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.type(input, 'chicken');
      userEvent.click(name);
      userEvent.click(searchBtn);
    });

    waitFor(() => {
      expect(screen.getAllByText(/Chicken Handi/i)).toBeInTheDocument();
    });
  });
  it('Deve pesquisar por ingrediente corretamente e realizar requisição à API', () => {
    const ingredient = screen.getByText(/ingredients/i);
    const input = screen.getByTestId(searchInput);
    const searchBtn = screen.getByTestId(searchButton);

    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.type(input, 'chicken');
      userEvent.click(ingredient);
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toBeCalledWith(mealsAPI);

    waitFor(() => {
      expect(screen.getAllByText(/Brown Stew Chicken/i)).toBeInTheDocument();
    });
  });
  it('Deve pesquisar pela primeira letra corretamente', () => {
    const firstLetter = screen.getByText(/first letter/i);
    const input = screen.getByTestId(searchInput);
    const searchBtn = screen.getByTestId(searchButton);

    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.type(input, 'c');
      userEvent.click(firstLetter);
      userEvent.click(searchBtn);
    });

    waitFor(() => {
      expect(screen.getAllByText(/Chocolate Gateau/i)).toBeInTheDocument();
    });
  });
  it('Deve retornar um alerta, caso a pesquisa seja inválida', () => {
    const firstLetter = screen.getByText(/first letter/i);
    const input = screen.getByTestId(searchInput);
    const searchBtn = screen.getByTestId(searchButton);

    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    act(() => {
      userEvent.type(input, 'chocolate');
      userEvent.click(firstLetter);
      userEvent.click(searchBtn);
    });

    waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(alertMessage);
    });
  });
});
describe('Testa o Header e SearchBar da página drinks', () => {
  it('Deve realizar busca na searchBar e chamar a API', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { route: '/drinks' });
    const search = screen.getByTestId('search-top-btn');
    const profile = screen.getByAltText(/profile-icon/i);

    expect(search).toBeVisible();
    expect(profile).toBeInTheDocument();

    waitFor(() => {
      act(() => {
        userEvent.click(search);
      });

      expect(history.location.pathname).toBe('/drinks');
    });
    const input = screen.getByTestId(searchInput);
    const searchBtn = screen.getByTestId(searchButton);
    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    act(() => {
      userEvent.type(input, 'c');
      userEvent.click(firstLetter);
      userEvent.click(searchBtn);
    });

    expect(global.fetch).toBeCalledWith(drinksAPI);

    waitFor(() => {
      expect(screen.getAllByText(/Casino/i)).toBeInTheDocument();
    });
  });
});
