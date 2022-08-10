export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_ID = 'SET_USER_ID';
export const WIPE_STATE = 'WIPE_STATE';

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn
});

export const setUserId = (userId: number) => ({
  type: SET_USER_ID,
  payload: userId
});

export const setWipeState = () => ({ type: WIPE_STATE });
