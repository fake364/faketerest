import React from 'react';
import CircleIconButton from '../../../common/components/buttons/CircleIconButton';
import { MdSearch } from '@react-icons/all-files/md/MdSearch';
import UserAvatarImage from '../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';
import { HiChat } from '@react-icons/all-files/hi/HiChat';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { IoHomeSharp } from '@react-icons/all-files/io5/IoHomeSharp';
import styles from './MobileNavigation.module.css';
import circleButtonStyle from '../../../common/components/buttons/CircleIconButton.module.css';
import UserDataEntity from '../../../common/backend/validation-services/registration/UserDataEntity';
import style from '../../header/navigation/auth-navigation/nav-buttons/AuthNavButtons.module.css';
import { NotificationType } from 'faketerest-utilities';

type Props = {};

const MobileNavigation: React.FC<Props> = () => {
  const userId: number = useSelector(
    (state: RootState) => state.metadata.userId
  );
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
  const userData: UserDataEntity = useSelector(
    (state: RootState) => state.userData.userData
  );
  const profileUrl = '/' + userData.username;
  const router = useRouter();

  const firstName: string = useSelector(
    (state: RootState) => state.userData?.userData?.firstName
  );

  const onClickProfile = async () => {
    await router.push(profileUrl);
  };

  const onClickHome = async () => {
    await router.push('/');
  };

  const onClickNotifications = async () => {
    await router.push('/notifications');
  };

  const iconStyle =
    'w-[50px] h-[50px] !text-[1.8rem] !p-[4px] flex justify-center';

  const totalNotifications = unreadNotifications.length + unreadMessagesCount;

  return (
    <div className={styles.mobileNavigationContainer}>
      <CircleIconButton
        className={clsx(iconStyle, router.asPath === '/' && '!text-[black]')}
        Icon={IoHomeSharp}
        onClick={onClickHome}
      />
      <CircleIconButton className={iconStyle} Icon={MdSearch} onClick={null} />
      <div className="relative">
        {totalNotifications > 0 && (
          <div className={style.notificationBubble}>{totalNotifications}</div>
        )}
        <CircleIconButton
          className={clsx(
            iconStyle,
            (router.asPath === '/notifications' ||
              router.asPath === '/inbox') &&
              '!text-[black]'
          )}
          Icon={HiChat}
          onClick={onClickNotifications}
        />
      </div>
      <div
        className={clsx(
          circleButtonStyle.circleButtonContainer,
          router.asPath === profileUrl && '!bg-[#e5e7eb]'
        )}
        onClick={onClickProfile}
      >
        <UserAvatarImage
          userId={userId}
          firstName={firstName}
          className={'h-[25px] w-[25px]'}
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
