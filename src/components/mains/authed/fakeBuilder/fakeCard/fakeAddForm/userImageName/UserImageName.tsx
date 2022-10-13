import React from 'react';
import UserAvatarImage from '../../../../../../header/navigation/auth-navigation/nav-buttons/user-button/user-image/UserAvatarImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';

type Props = {};

const UserImageName: React.FC<Props> = () => {
  const {
    userData: { userData }
  } = useSelector((state: RootState) => state);
  return (
    <div className="flex items-center gap-[12px]">
      <UserAvatarImage
        firstName={userData.firstName}
        className={'w-[50px] h-[50px]'}
      />
      <span className="font-[500]">{`${userData.firstName}${
        userData.lastName ? ' ' + userData.lastName : ''
      }`}</span>
    </div>
  );
};

export default UserImageName;
