import React from 'react';
import {
  EVENT_TYPE,
  NotificationType
} from '../../../../../../common/types/events/EventTypes';
import SubscriptionNotification from './subscriptionNotification/SubscriptionNotification';

type Props = {
  notificationData: NotificationType;
};

const NotificationWrapper: React.FC<Props> = ({
  notificationData: { key, payload }
}) => {
  if (payload.eventType === EVENT_TYPE.SUBSCRIPTION) {
    return <SubscriptionNotification notificationId={key} data={payload} />;
  }

  return <></>;
};

export default NotificationWrapper;
