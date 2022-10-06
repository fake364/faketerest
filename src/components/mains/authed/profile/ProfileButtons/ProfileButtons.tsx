import React from 'react';
import { UserData } from '../../../../../common/types/user-types/UserData';
import { useRouter } from 'next/router';
import MyProfileButtons from './myProfileButtons/MyProfileButtons';
import AnothersProfileButtons from './anothersProfileButtons/AnothersProfileButtons';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';

type Props = { userData: UserDataEntity };

const ProfileButtons: React.FC<Props> = ({ userData }) => {
  const { query } = useRouter();

  return (
    <div className="flex mt-[18px] gap-[14px]">
      {query?.username === userData.username ? (
        <MyProfileButtons />
      ) : (
        <AnothersProfileButtons />
      )}
    </div>
  );
};

export default ProfileButtons;
