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
        PagerNotificationsService.socket.emit(CLIENT_EVENTS.READ_NOTIFICATIONS, unreadKeys);
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
      dropdownClass={'right-[-130px] top-[24px] drop-shadow-md overflow-y-auto'}
      onOpenDropdown={onOpenDropdown}
    >
      <div className={'w-[340px] max-h-[80vh] min-h-[300px] relative'}>
        {notifications.length === 0 ? (
          <div
            className={
              'w-full h-full absolute m-auto l-0 r-0 flex items-center justify-center flex-col gap-[12px]'
            }
          >
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
