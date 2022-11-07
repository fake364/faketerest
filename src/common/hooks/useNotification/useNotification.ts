import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';
import useFakeSnackbar from '../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { SubscriptionNotificationPayload } from '../../../redux/types/types';
import { setNotifications } from '../../../redux/actions/metadata/actions';
import PagerNotificationsService from '../../singletons/PagerNotificationsService';

export const useNotification = () => {
  const myId = useSelector((state: RootState) => state.metadata.userId);
  const { addFakeSnack } = useFakeSnackbar();
  const dispatch = useDispatch();

  const connectAndAssignListeners = async () => {
    await PagerNotificationsService.setupListeners(myId);

    PagerNotificationsService.socket.on(
      'init-notifications',
      (notifications) => {
        console.log('init', setNotifications(notifications));
        dispatch(setNotifications(notifications));
      }
    );

    PagerNotificationsService.socket.on('subscription', (...rest) => {
      const obj: SubscriptionNotificationPayload = rest[0];
      console.log('KEK', rest);
      addFakeSnack({
        text: `${obj.fromFirstname} ${obj.fromLastname} has just subscribed to you`
      });
    });

    PagerNotificationsService.socket.on('read-notifications',()=>{
      console.log('READ NOTIFICATIONS');
    });
  };

  useEffect(() => {
    if (myId) {
      connectAndAssignListeners();
    }

    return () => {};
  }, [myId]);
};
