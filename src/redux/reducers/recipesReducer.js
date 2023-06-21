import {
  GET_CATEGORIES,
  GET_RECIPES,
  GET_DETAILS_AND_RECOMMENDATIONS,
  REDIRECT_TO_DETAILS,
  REFRESH_FAVORITE,
} from '../actions';

const INITIAL_STATE = {
  recipes: [],
  searched: false,
  categories: [],
  filteredByCategory: true,
  details: {},
  recommendations: [],
  refreshFavorite: false,
};

const recipes = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_RECIPES:
    return {
      ...state,
      recipes: payload,
      searched: true,
    };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: payload,
    };
  case REDIRECT_TO_DETAILS:
    return {
      ...state,
      filteredByCategory: payload,
    };
  case GET_DETAILS_AND_RECOMMENDATIONS:
    return {
      ...state,
      details: payload.details,
      recommendations: payload.recommendations,
    };
  case REFRESH_FAVORITE:
    return {
      ...state,
      refreshFavorite: !state.refreshFavorite,
    };
  default:
    return state;
  }
};

export default recipes;
