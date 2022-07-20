import { AnyAction } from 'redux';
import { SET_IS_LOGGED_IN } from '../actions/metadata/actions';

type MetadataState = {
  isLoggedIn: boolean;
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
    default:
      return state;
  }
}
