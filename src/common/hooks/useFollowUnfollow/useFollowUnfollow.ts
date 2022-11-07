import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';
import { useEffect, useState } from 'react';
import useFakeSnackbar from '../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { Dispatch } from 'redux';
import { setSubscriptionsIds } from '../../../redux/actions/metadata/actions';

const useFollowUnfollow = (targetId: number) => {
  const myId = useSelector((state: RootState) => state.metadata.userId);
  const subscribedOn = useSelector(
    (state: RootState) => state.metadata.subscriptionsIds
  );
  const [isSubscribed, setSubscribed] = useState<boolean>(
    subscribedOn.includes(targetId)
  );
  const dispatch: Dispatch = useDispatch();

  const { addFakeSnack } = useFakeSnackbar();

  useEffect(() => {
    setSubscribed(subscribedOn.includes(targetId));
  }, [subscribedOn]);

  useEffect(() => {
    if (isSubscribed) {
      dispatch(
        setSubscriptionsIds(Array.from(new Set([...subscribedOn, targetId])))
      );
    } else {
      dispatch(
        setSubscriptionsIds(subscribedOn.filter((id) => targetId !== id))
      );
    }
  }, [isSubscribed]);

  const onUnfollow = async () => {
    try {
      await axios.delete('/api/subscription/user', {
        data: { fromUser: myId, toUser: targetId }
      });
      setSubscribed(false);
    } catch (e) {
      addFakeSnack({ text: 'Error during unfollow request' });
    }
  };

  const onFollow = async () => {
    try {
      await axios.post('/api/subscription/user', {
        fromUser: myId,
        toUser: targetId
      });
      setSubscribed(true);
    } catch (e) {
      addFakeSnack({ text: 'Error during follow request' });
    }
  };

  return { onFollow, onUnfollow, isSubscribed };
};

export default useFollowUnfollow;
