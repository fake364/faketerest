import React from 'react';
import { UserData } from '../../../../common/types/user-types/UserData';
import styles from './Profile.module.css';
import ProfileButtons from './ProfileButtons/ProfileButtons';

type Props = { userData: UserData };

const Profile: React.FC<Props> = ({ userData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={styles.roundedButton}>
        {userData.username[0].toUpperCase()}
      </div>
      <div className="text-[36px] mt-[16px]">
        {[userData.firstName, userData.lastName].join(' ')}
      </div>
      <div className="text-[14px] text-[#767676] mt-[4px]">
        @{userData.username}
      </div>
      <div className="text-[16px] mt-[10px]">0 подписок</div>
      <ProfileButtons userData={userData} />
    </div>
  );
};

export default Profile;
