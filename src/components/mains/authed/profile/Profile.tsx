import React from 'react';
import styles from './Profile.module.css';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import ProfilePins from './profilePins/ProfilePins';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import UserAvatarImage from '../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import { ProfilePageProps } from '../../../../../pages/[username]';
import SubscriptionsBlock from './subscriptionsBlock/SubscriptionsBlock';

const Profile: React.FC<ProfilePageProps> = ({
  userData,
  subscribers,
  subscriptions
}) => {
  return (
    <div className="flex flex-col items-center">
      <UserAvatarImage
        firstName={userData.firstName}
        key={userData.id}
        userId={userData.id}
        className={clsx(
          styles.roundedButton,
          styles.roundedButtonSizes,
          'mt-[24px]',
          'cursor-pointer'
        )}
      />
      <div className="text-[36px] mt-[16px]">
        {[userData.firstName, userData.lastName].join(' ')}
      </div>
      <div className="text-[14px] text-[#767676] mt-[4px]">
        @{userData.username}
      </div>
      <SubscriptionsBlock
        subscribers={subscribers}
        subscriptions={subscriptions}
      />
      <ProfileButtons userData={userData} />
      <ProfilePins />
    </div>
  );
};

export default Profile;
