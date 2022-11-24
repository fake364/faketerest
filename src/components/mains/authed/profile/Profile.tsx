import React from 'react';
import styles from './Profile.module.css';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import ProfilePins from './profilePins/ProfilePins';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import UserAvatarImage from '../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import { ProfilePageProps } from '../../../../../pages/[username]';
import SubscriptionsBlock from './subscriptionsBlock/SubscriptionsBlock';
import getFirstLastName from '../../../../common/utils/firstLastNameCreate/getFirstLastName';
import { mobileCheck } from '../../../../common/utils/mobileCheck/mobileCheck';

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
      <div
        className={clsx(
          'mt-[16px]',
          mobileCheck() ? 'text-[1.6rem]' : 'text-[36px]'
        )}
      >
        {getFirstLastName(userData.firstName, userData.lastName)}
      </div>
      <div className="text-[14px] text-[#767676] mt-[4px]">
        @{userData.username}
      </div>
      <SubscriptionsBlock
        subscribers={subscribers}
        subscriptions={subscriptions}
      />
      <ProfileButtons userData={userData} />
      <ProfilePins userId={userData.id} username={userData.username} />
    </div>
  );
};

export default Profile;
