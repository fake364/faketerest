import { NotificationType } from 'faketerest-utilities';

export const getUnreadNotificationsKeys = (notifications: NotificationType[]) =>
  notifications
    .filter(({ payload: { hasBeenRead } }) => !hasBeenRead)
    .map(({ key }) => key);

export const getReadNotifications = (
  notifications: NotificationType[]
): NotificationType[] => {
  return notifications.map((notification) => {
    return {
      key: notification.key,
      payload: { ...notification.payload, hasBeenRead: true }
    };
  });
};

export const readNotificationMapFn =
  (key: string) =>
  (notification): NotificationType =>
    notification.key === key
      ? notification
      : {
          key: notification.key,
          payload: { ...notification.payload, hasBeenRead: true }
        };
