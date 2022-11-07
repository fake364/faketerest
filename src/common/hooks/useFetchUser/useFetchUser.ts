import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/types';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../../../redux/actions/user-data/actions';
import axios from 'axios';
import useFakeSnackbar from '../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { setSubscriptionsIds } from '../../../redux/actions/metadata/actions';

export const useFetchUser = () => {
  const dispatch: ThunkDispatch<RootState, {}, AnyAction> = useDispatch();
  const { addFakeSnack } = useFakeSnackbar();

  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const userId: number | undefined = useSelector(
    (state: RootState) => state.metadata.userId
  );

  const userData = useSelector((state: RootState) => state.userData.userData);

  const fetchSubscriptionIds = async () => {
    try {
      const result = await axios.get('/api/subscription/user?userId=' + userId);
      dispatch(setSubscriptionsIds(result.data));
    } catch (e) {
      addFakeSnack({ text: 'Failed to fetch ids' });
    }
  };

  useEffect(() => {
    if (isLoggedIn && userId && !userData) {
      dispatch(fetchUserData(userId));
    }
    if (isLoggedIn && userId) {
      fetchSubscriptionIds();
    }
  }, [isLoggedIn, userId]);
};
