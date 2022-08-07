import { AnyAction } from 'redux';
import { SET_IS_LOGGED_IN, SET_USER_ID } from '../actions/metadata/actions';

type MetadataState = {
  isLoggedIn: boolean;
  userId?: number;
};

const initialState: MetadataState = {
  isLoggedIn: false
};

export default function metadataReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}
