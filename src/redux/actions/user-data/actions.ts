import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import UserDataEntity from '../../../common/backend/validation-services/registration/UserDataEntity';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_LOADING = 'SET_USER_DATA_LOADING';

export const setUserLoading = (isLoading: boolean) => ({
  type: SET_USER_DATA_LOADING,
  payload: isLoading
});

export const fetchUserData = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const res: AxiosResponse<UserDataEntity> = await axios.get(
      'api/registration/' + userId
    );
    dispatch(setUserData(res.data));
  } catch (e) {
    console.error('User setup failed', e);
  }
};

export const setUserData = (payload: UserDataEntity) => ({
  type: SET_USER_DATA,
  payload
});
