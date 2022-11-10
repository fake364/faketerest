import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../../redux/types';
import useFakeSnackbar from '../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { setNotifications } from '../../../redux/actions/metadata/actions';
import PagerNotificationsService from '../../singletons/PagerNotificationsService';
import { SubscriptionPayload } from 'faketerest-utilities/dist/events/subscription/types';
import {
  CLIENT_EVENTS,
  filterAndSortNotifications,
  filterDuplicateNotifications,
  NotificationType
} from 'faketerest-utilities';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';
import PostCreatePayload from 'faketerest-utilities/dist/events/postCreate/types';
import getFirstLastName from '../../utils/firstLastNameCreate/getFirstLastName';

export const useNotification = () => {
  const myId = useSelector((state: RootState) => state.metadata.userId);
  const { addFakeSnack } = useFakeSnackbar();
  const dispatch = useDispatch();
  const store = useStore<RootState>();

  const addNotification = (notification: NotificationType) => {
    const notifications: NotificationType[] =
      store.getState().metadata.notifications;
    const filteredNotifications: NotificationType[] =
      filterAndSortNotifications([...notifications, notification]);
    dispatch(setNotifications(filteredNotifications));
  };

  const connectAndAssignListeners = async () => {
    await PagerNotificationsService.setupListeners(myId);

    PagerNotificationsService.socket.on(
      CLIENT_EVENTS.INIT_NOTIFICATIONS,
      (notifications) => {
        dispatch(setNotifications(filterDuplicateNotifications(notifications)));
      }
    );

    PagerNotificationsService.socket.on(
      CLIENT_EVENTS.COMMON_NOTIFICATION,
      (notification: NotificationType) => {
        console.log('KEK!!11111', notification);

        let snackText;
        switch (notification.payload.eventType) {
          case EVENT_TYPE.POST_CREATE:
            const { authorFirstname, authorLastName } =
              notification.payload as PostCreatePayload;
            snackText = `${getFirstLastName(
              authorFirstname,
              authorLastName
            )} has just posted image, look`;
            break;
          case EVENT_TYPE.SUBSCRIPTION:
            const { fromFirstname, fromLastname } =
              notification.payload as SubscriptionPayload;
            snackText = `${getFirstLastName(
              fromFirstname,
              fromLastname
            )} has just subscribed to you`;
            break;
        }
        console.log('KEK', notification);
        if (snackText) {
          addFakeSnack({
            text: snackText
          });
        }
        addNotification(notification);
      }
    );
  };

  useEffect(() => {
    if (myId) {
      connectAndAssignListeners();
    }

    return () => {};
  }, [myId]);
};
