import React from 'react';
import MyProfileButtons from './myProfileButtons/MyProfileButtons';
import AnotherAccountButtons from './anothersProfileButtons/AnotherAccountButtons';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types';

type Props = { userData: UserDataEntity };

const ProfileButtons: React.FC<Props> = ({ userData }) => {
  const myId = useSelector((state: RootState) => state.metadata.userId);

  return (
    <div className="flex mt-[18px] gap-[14px]">
      {myId === userData.id ? (
        <MyProfileButtons />
      ) : (
        <AnotherAccountButtons pageId={userData.id} />
      )}
    </div>
  );
};

export default ProfileButtons;
