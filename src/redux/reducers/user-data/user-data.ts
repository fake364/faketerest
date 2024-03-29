import { AnyAction } from 'redux';
import { WIPE_STATE } from '../../actions/metadata/actions';
import { UserData } from '../../../common/types/user-types/UserData';
import {
  SET_USER_DATA,
  SET_USER_DATA_LOADING
} from '../../actions/user-data/actions';
import UserDataEntity from '../../../common/backend/validation-services/registration/UserDataEntity';

type UserDataState = {
  isLoading: boolean;
  userData?: UserDataEntity;
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
    case WIPE_STATE:
      return initialState;
    default:
      return state;
  }
}
