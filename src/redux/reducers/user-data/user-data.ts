import { AnyAction } from 'redux';
import { SET_IS_LOGGED_IN, SET_USER_ID } from '../../actions/metadata/actions';
import { UserData } from '../../../common/types/user-types/UserData';
import {
  SET_USER_DATA,
  SET_USER_DATA_LOADING
} from '../../actions/user-data/actions';

type UserDataState = {
  isLoading: boolean;
  userData?: UserData;
};

const initialState: UserDataState = {
  isLoading: false
};

export default function userDataReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_USER_DATA_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
