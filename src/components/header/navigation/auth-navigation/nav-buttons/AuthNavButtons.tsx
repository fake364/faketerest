import React from 'react';
import UserRoundButton from './user-button/UserRoundButton';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types';
import style from './AuthNavButtons.module.css';
import NotificationDropdown from './notificationDropdown/NotificationDropdown';
import { NotificationType } from 'faketerest-utilities';
import MessageDropdown from './messageDropdown/MessageDropdown';

type Props = {};

const AuthNavButtons: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  const notifications: NotificationType[] = useSelector(
    (state: RootState) => state.metadata.notifications
  );
  const unreadNotifications = notifications.filter(
    ({ payload: { hasBeenRead } }) => !hasBeenRead
  );
  const unreadMessagesCount = useSelector((state: RootState) => {
    const map = state.messages.messagesMap;
    return Object.values(map).flat().length;
  });

  return (
    <>
      <div className="relative">
        {unreadNotifications.length > 0 && (
          <div className={style.notificationBubble}>
            {unreadNotifications.length}
          </div>
        )}
        <NotificationDropdown />
      </div>
      <div className="relative">
        {unreadMessagesCount > 0 && (
          <div className={style.notificationBubble}>{unreadMessagesCount}</div>
        )}
        <MessageDropdown />
      </div>
      <UserRoundButton />
    </>
  );
};

export default AuthNavButtons;
