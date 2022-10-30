import React from 'react';
import { UserData } from '../../../../common/types/user-types/UserData';
import styles from './Profile.module.css';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import ProfilePins from './profilePins/ProfilePins';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import UserAvatarImage from '../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import UserDataEntity from '../../../../common/backend/validation-services/registration/UserDataEntity';

type Props = { userData: UserDataEntity };

const Profile: React.FC<Props> = ({ userData }) => {
  const { t } = useTranslation('profile');
  console.log(userData);
  return (
    <div className="flex flex-col items-center">
      <UserAvatarImage
        firstName={userData.firstName}
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
      <div className="text-[16px] mt-[10px]">
        {t('subscriber', { count: 1212 })}
      </div>
      <ProfileButtons userData={userData} />
      <ProfilePins />
    </div>
  );
};

export default Profile;
