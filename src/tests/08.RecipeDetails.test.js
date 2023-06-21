import React from 'react';
import { render } from '@testing-library/react';
import { useParams, useLocation } from 'react-router-dom';
import RecipeDetails from '../pages/RecipeDetails';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../components/DrinkDetail', () => jest.fn());
jest.mock('../components/MealDetail', () => jest.fn());
afterEach(() => {
  jest.clearAllMocks();
});
describe('Testa o componente RecipeDetails', () => {
  it('Testa se tem o pathname "/drinks"', () => {
    useParams.mockReturnValue({ idDaReceita: '123' });
    useLocation.mockReturnValue({ pathname: '/drinks' });
    render(<RecipeDetails />);
    expect(DrinkDetail).toHaveBeenCalledWith({ id: '123' }, {});
    expect(MealDetail).not.toHaveBeenCalled();
  });

  it('Testa se tem não tem o pathname "/drinks"', () => {
    useParams.mockReturnValue({ idDaReceita: '456' });
    useLocation.mockReturnValue({ pathname: '/meals' });
    render(<RecipeDetails />);
    expect(DrinkDetail).not.toHaveBeenCalled();
    expect(MealDetail).toHaveBeenCalledWith({ id: '456' }, {});
  });
});
