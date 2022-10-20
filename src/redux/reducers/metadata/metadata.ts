import { AnyAction } from 'redux';
import {
  SET_HEADER_MODE,
  SET_IS_LOGGED_IN,
  SET_USER_ID,
  WIPE_STATE
} from '../../actions/metadata/actions';
import { HEADER_MODE } from '../../../components/layout/Layout';

type MetadataState = {
  isLoggedIn: boolean;
  userId?: number;
  headerMode: HEADER_MODE;
};

const initialState: MetadataState = {
  isLoggedIn: false,
  headerMode: HEADER_MODE.DEFAULT
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
    case WIPE_STATE:
      return initialState;
    case SET_HEADER_MODE:
      return { ...state, headerMode: action.payload };
    default:
      return state;
  }
}
