import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:idDaReceita" component={ RecipeDetails } />
        <Route exact path="/drinks/:idDaReceita" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:idDaReceita/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:idDaReceita/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default Routes;
