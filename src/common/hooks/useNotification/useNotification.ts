import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../../redux/types';
import useFakeSnackbar from '../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import { setNotifications } from '../../../redux/actions/metadata/actions';
import PagerNotificationsService from '../../singletons/PagerNotificationsService';
import {
  CLIENT_EVENTS,
  filterAndSortNotifications,
  filterDuplicateNotifications,
  NotificationType
} from 'faketerest-utilities';
import { getSnackText } from './utils/utils';
import axios from 'axios';
import { MessagesMap } from '../../../redux/reducers/messages/messageReducer';
import UserDataEntity from '../../backend/validation-services/registration/UserDataEntity';
import {
  assignUserToMap,
  setMessagesMap
} from '../../../redux/actions/messages/actions';

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

        const snackText = getSnackText(notification.payload);
        if (snackText) {
          addFakeSnack({
            text: snackText
          });
        }
        addNotification(notification);
      }
    );
  };

  const initializeMessagesBox = async () => {
    const { data } = await axios.get<MessagesMap>('/api/messages/dialogs');
    const ids = Object.keys(data);
    const usersResponses = await Promise.all(
      ids.map((id) => axios.get<UserDataEntity>('/api/registration/' + id))
    );
    dispatch(setMessagesMap(data));
    usersResponses.forEach(({ data }) => dispatch(assignUserToMap(data)));
  };

  useEffect(() => {
    if (myId) {
      connectAndAssignListeners();
      initializeMessagesBox();
    }

    return () => {
      PagerNotificationsService.socket?.disconnect();
    };
  }, [myId]);
};
