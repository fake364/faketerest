import React, { useEffect } from 'react';

import SubscriptionNotification from './subscriptionNotification/SubscriptionNotification';
import PagerNotificationsService from '../../../../../../common/singletons/PagerNotificationsService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import { Dispatch } from 'redux';
import { setNotifications } from '../../../../../../redux/actions/metadata/actions';
import { CLIENT_EVENTS, NotificationType } from 'faketerest-utilities';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';

type Props = {
  notificationData: NotificationType;
};

const NotificationWrapper: React.FC<Props> = ({
  notificationData: { key, payload }
}) => {
  const notifications: NotificationType[] = useSelector(
    (state: RootState) => state.metadata.notifications
  );
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (!payload.hasBeenRead) {
      PagerNotificationsService.socket.emit(CLIENT_EVENTS.READ_NOTIFICATIONS, [
        key
      ]);
      const readNotifications = notifications.map(
        (notification): NotificationType =>
          notification.key === key
            ? notification
            : {
                key: notification.key,
                payload: { ...notification.payload, hasBeenRead: true }
              }
      );
      dispatch(setNotifications(readNotifications));
    }
  }, []);

  if (payload.eventType === EVENT_TYPE.SUBSCRIPTION) {
    return <SubscriptionNotification notificationId={key} data={payload} />;
  }

  return <></>;
};

export default NotificationWrapper;
