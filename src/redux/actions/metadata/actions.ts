export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn
});
