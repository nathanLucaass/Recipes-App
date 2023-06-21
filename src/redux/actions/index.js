// ACTIONS TYPES
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REDIRECT_TO_DETAILS = 'REDIRECT_TO_DETAILS';
export const GET_DETAILS_AND_RECOMMENDATIONS = 'GET_DETAILS_AND_RECOMMENDATIONS';
export const REFRESH_FAVORITE = 'REFRESH_FAVORITE';
// ACTIONS CREATORS
export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const getRecipes = (payload) => ({
  type: GET_RECIPES,
  payload,
});

export const getCategories = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});

export const redirectToDetails = (payload) => ({
  type: REDIRECT_TO_DETAILS,
  payload,
});

export const getDetailsAndRecommendations = (payload) => ({
  type: GET_DETAILS_AND_RECOMMENDATIONS,
  payload,
});

export const getRecommendations = (payload) => ({
  type: GET_RECOMMENDATIONS,
  payload,

});

export const refreshFavorites = () => ({
  type: REFRESH_FAVORITE,
});

export const fetchRecipes = (url) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(getRecipes(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = (url) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const categoryType = data.meals || data.drinks;
    const FIVE = 5;
    const dataSliced = categoryType.slice(0, FIVE);
    dispatch(getCategories(dataSliced));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipesByCategory = (url, bool) => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();
  dispatch(getRecipes(data));
  dispatch(redirectToDetails(bool));
};

export const fetchDetailsAndRecommendations = (url) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const detailType = data.meals || data.drinks;
    let recommendationsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (url.includes('meal')) {
      recommendationsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    const recommendationsResponse = await fetch(recommendationsUrl);
    const recommendationsData = await recommendationsResponse.json();
    const recommendations = recommendationsData.meals || recommendationsData.drinks;
    const Limit = 6;
    const dataSliced = recommendations.slice(0, Limit);
    const payload = {
      details: detailType[0],
      recommendations: dataSliced,
    };
    dispatch(getDetailsAndRecommendations(payload));
  } catch (error) {
    console.log(error);
  }
};
