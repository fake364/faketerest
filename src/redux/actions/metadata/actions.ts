import { HEADER_MODE } from '../../../components/layout/Layout';
import { NotificationType } from 'faketerest-utilities';

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_ID = 'SET_USER_ID';
export const WIPE_STATE = 'WIPE_STATE';
export const SET_HEADER_MODE = 'SET_HEADER_MODE';
export const SET_SUBSCRIPTIONS_IDS = 'SET_SUBSCRIPTIONS_IDS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export const setNotifications = (notifications: NotificationType[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications
});

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn
});

export const setUserId = (userId: number) => ({
  type: SET_USER_ID,
  payload: userId
});

export const setHeaderMode = (mode: HEADER_MODE) => ({
  type: SET_HEADER_MODE,
  payload: mode
});

export const setSubscriptionsIds = (ids: number[]) => ({
  type: SET_SUBSCRIPTIONS_IDS,
  payload: ids
});

export const setWipeState = () => ({ type: WIPE_STATE });
