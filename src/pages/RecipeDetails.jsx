import React from 'react';
import { useParams, useLocation } from 'react-router-dom/';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';
import './RecipeDetails.css';
import BackButton from '../components/buttons/BackBtn';

export default function RecipeDetails() {
  const { idDaReceita } = useParams();
  const { pathname } = useLocation();

  return (
    <main className="details">
      <BackButton />
      {pathname.includes('/drinks') ? (
        <DrinkDetail id={ idDaReceita } />
      ) : (
        <MealDetail id={ idDaReceita } />
      )}
    </main>
  );
}
