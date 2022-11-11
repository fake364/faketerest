import React from 'react';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import NotificationWrapper from '../notificationWrapper/NotificationWrapper';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import { Dispatch } from 'redux';
import {
  getReadNotifications,
  getUnreadNotificationsKeys
} from './utils/utils';
import { setNotifications } from '../../../../../../redux/actions/metadata/actions';
import PagerNotificationsService from '../../../../../../common/singletons/PagerNotificationsService';
import { FiBellOff } from '@react-icons/all-files/fi/FiBellOff';
import { CLIENT_EVENTS, NotificationType } from 'faketerest-utilities';
import styles from './NotificationDropdown.module.css';

type Props = {};

const NotificationDropdown: React.FC<Props> = () => {
  const notifications: NotificationType[] = useSelector(
    (state: RootState) => state.metadata.notifications
  );
  const dispatch: Dispatch = useDispatch();

  const onOpenDropdown = () => {
    try {
      const unreadKeys = getUnreadNotificationsKeys(notifications);
      if (unreadKeys.length > 0) {
        dispatch(setNotifications(getReadNotifications(notifications)));
        PagerNotificationsService.socket.emit(
          CLIENT_EVENTS.READ_NOTIFICATIONS,
          unreadKeys
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DropdownRootElement
      variant={'icon'}
      buttonClass={'!text-[24px]'}
      Icon={FaBell}
      dropdownClass={styles.dropdownClass}
      onOpenDropdown={onOpenDropdown}
      tooltipText={'Notifications'}
    >
      <div className={styles.dropdownBody}>
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
    </DropdownRootElement>
  );
};

export default NotificationDropdown;
