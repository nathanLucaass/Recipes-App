import React from 'react';
import { render, screen } from '@testing-library/react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Drinks from '../components/Drinks';

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(),
  Link: jest.fn(({ children }) => children),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/actions', () => ({
  fetchRecipes: jest.fn(),
}));

describe('Drinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renderiza o componente Redirect quando apenas uma bebida está presente e filteredByCategory é verdadeiro.', () => {
    const drinksData = {
      drinks: [{ idDrink: '1', strDrink: 'Drink 1' }],
    };

    useSelector.mockReturnValue({ filteredByCategory: true, searched: false });
    render(<Drinks data={ drinksData } />);

    expect(Redirect).toHaveBeenCalledWith(
      { to: '/drinks/1' },
      {},
    );
  });
  it('não renderiza os drinks', () => {
    const drinksData = {};

    useSelector.mockReturnValue({ filteredByCategory: false, searched: false });
    render(<Drinks data={ drinksData } />);

    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByText('Drink 1')).toBeNull();
    expect(screen.queryByText('Drink 2')).toBeNull();
  });
});

// it('renderiza no maximo 12 cards', () => {
//   const drinksData = {
//     drinks: [
//       { idDrink: '1', strDrink: 'Drink 1' },
//       { idDrink: '2', strDrink: 'Drink 2' },
//       { idDrink: '3', strDrink: 'Drink 3' },
//     ],
//   };

//   useSelector.mockReturnValue({ filteredByCategory: false, searched: false });
//   render(<Drinks data={ drinksData } />);

//   expect(screen.getByText('Drink 1')).toBeInTheDocument();
//   expect(screen.getByText('Drink 2')).toBeInTheDocument();
//   expect(screen.getByText('Drink 3')).toBeInTheDocument();

//   expect(screen.queryByText('Drink 13')).toBeNull();
// });

// it('mostra um alerta quando searched é verdadeiro e os dados das bebidas estão ausentes.', () => {
//   const drinksData = {};

//   global.alert = jest.fn();
//   const dispatch = jest.fn();
//   useDispatch.mockReturnValue(dispatch);
//   useSelector.mockReturnValue({ filteredByCategory: false, searched: true });

//   render(<Drinks data={ drinksData } />);

//   expect(global.alert).toHaveBeenCalledWith(
//     'Sorry, we haven\'t found any recipes for these filters.',
//   );

//   expect(dispatch).toHaveBeenCalledWith(
//     fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='),
//   );

//   expect(screen.queryByText('Drink 1')).toBeNull();
//   expect(screen.queryByText('Drink 2')).toBeNull();
// });

// it('Renderiza o componente Link com o caminho correto para cada recipe card.', () => {
//   const drinksData = {
//     drinks: [
//       { idDrink: '1', strDrink: 'Drink 1' },
//       { idDrink: '2', strDrink: 'Drink 2' },
//     ],
//   };

//   useSelector.mockReturnValue({ filteredByCategory: false, searched: false });
//   render(<Drinks data={ drinksData } />);

//   const linkElements = screen.getAllByRole('link');

//   expect(linkElements).toHaveLength(2);
//   expect(linkElements[0]).toHaveAttribute('href', '/drinks/1');
//   expect(linkElements[1]).toHaveAttribute('href', '/drinks/2');
// });
