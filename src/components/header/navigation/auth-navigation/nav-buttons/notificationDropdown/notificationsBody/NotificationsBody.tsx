import React from 'react';
import styles from '../NotificationDropdown.module.css';
import { FiBellOff } from '@react-icons/all-files/fi/FiBellOff';
import NotificationWrapper from '../../notificationWrapper/NotificationWrapper';
import { NotificationType } from 'faketerest-utilities';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';
import clsx from 'clsx';

type Props = { className?: string };

const NotificationsBody: React.FC<Props> = ({ className }) => {
  const notifications: NotificationType[] = useSelector(
    (state: RootState) => state.metadata.notifications
  );
  return (
    <div className={clsx(styles.dropdownBody, className)}>
      {notifications.length === 0 ? (
        <div className={styles.emptyListContainer}>
          <FiBellOff className={'text-[48px] text-[gray]'} />
          <div className={'text-center text-[24px] text-[gray] font-[300]'}>
            No notifications yet
          </div>
        </div>
      ) : (
        notifications.map((data) => (
          <NotificationWrapper notificationData={data} />
        ))
      )}
    </div>
  );
};

export default NotificationsBody;
