import { UserData } from '../../../common/types/user-types/UserData';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_LOADING = 'SET_USER_DATA_LOADING';

export const setUserLoading = (isLoading: boolean) => ({
  type: SET_USER_DATA_LOADING,
  payload: isLoading
});

export const fetchUserData = (userId: number) => async (dispatch: Dispatch) => {
  const res: AxiosResponse<UserData> = await axios.get(
    'api/registration/' + userId
  );
  dispatch(setUserData(res.data));
};

export const setUserData = (payload: UserData) => ({
  type: SET_USER_DATA,
  payload
});
