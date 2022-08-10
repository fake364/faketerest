import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/types';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../../../redux/actions/user-data/actions';

export const useFetchUser = () => {
  const dispatch: ThunkDispatch<RootState, {}, AnyAction> = useDispatch();

  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const userId: number | undefined = useSelector(
    (state: RootState) => state.metadata.userId
  );

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchUserData(userId));
    }
  }, [isLoggedIn, userId]);
};
