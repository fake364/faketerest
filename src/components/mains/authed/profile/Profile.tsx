import React from 'react';
import { UserData } from '../../../../common/types/user-types/UserData';
import styles from './Profile.module.css';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import ProfilePins from './profilePins/ProfilePins';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

type Props = { userData: UserData };

const Profile: React.FC<Props> = ({ userData }) => {
  const { t } = useTranslation('profile');
  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          styles.roundedButton,
          styles.roundedButtonSizes,
          'mt-[24px]',
          'cursor-pointer'
        )}
      >
        {userData.firstName[0].toUpperCase()}
      </div>
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
