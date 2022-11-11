import React, { useEffect } from 'react';

import SubscriptionNotification from './subscriptionNotification/SubscriptionNotification';
import PagerNotificationsService from '../../../../../../common/singletons/PagerNotificationsService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import { Dispatch } from 'redux';
import { setNotifications } from '../../../../../../redux/actions/metadata/actions';
import { CLIENT_EVENTS, NotificationType } from 'faketerest-utilities';
import EVENT_TYPE from 'faketerest-utilities/dist/events/types';
import { SubscriptionPayload } from 'faketerest-utilities/dist/events/subscription/types';
import PostCreatedNotification from './postCreatedNotification/PostCreatedNotification';
import PostCreatePayload from 'faketerest-utilities/dist/events/postCreate/types';
import { readNotificationMapFn } from '../notificationDropdown/utils/utils';
import PostCommentedNotification from './postCommentedNotification/PostCommentedNotification';
import { PostCommentedPayload } from 'faketerest-utilities/dist/events/comment/types';

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
      const readNotifications = notifications.map(readNotificationMapFn(key));
      dispatch(setNotifications(readNotifications));
    }
  }, []);

  if (payload.eventType === EVENT_TYPE.SUBSCRIPTION) {
    return (
      <SubscriptionNotification
        notificationId={key}
        data={payload as SubscriptionPayload}
      />
    );
  }

  if (payload.eventType === EVENT_TYPE.POST_CREATE) {
    return <PostCreatedNotification data={payload as PostCreatePayload} />;
  }

  if (payload.eventType === EVENT_TYPE.COMMENT) {
    return <PostCommentedNotification data={payload as PostCommentedPayload} />;
  }

  return <></>;
};

export default NotificationWrapper;
