import React from 'react';
import Tooltip from '../../../../../common/components/tooltip/Tooltip';
import CircleIconButton from '../../../../../common/components/buttons/CircleIconButton';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import UserRoundButton from './user-button/UserRoundButton';
import useTranslation from 'next-translate/useTranslation';
import DropdownRootElement from '../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types';
import { NotificationType } from '../../../../../common/types/events/EventTypes';
import style from './AuthNavButtons.module.css';
import NotificationWrapper from './notificationWrapper/NotificationWrapper';
import NotificationDropdown from './notificationDropdown/NotificationDropdown';

type Props = {};

const AuthNavButtons: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  const notifications: NotificationType[] = useSelector(
    (state: RootState) => state.metadata.notifications
  );
  console.log('lelell', notifications);
  const unreadNotifications = notifications.filter(
    ({ payload: { hasBeenRead } }) => !hasBeenRead
  );
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
      <Tooltip text={t('header.tooltips.messages')}>
        <CircleIconButton
          Icon={FaCommentDots}
          className="px-[12px]"
          onClick={null}
        />
      </Tooltip>
      <UserRoundButton />
    </>
  );
};

export default AuthNavButtons;
