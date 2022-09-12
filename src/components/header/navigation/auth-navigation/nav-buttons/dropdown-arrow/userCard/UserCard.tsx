import React from 'react';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import { UserData } from '../../../../../../../common/types/user-types/UserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';

type Props = { onClick: (username: string) => void };

const UserCard: React.FC<Props> = ({ onClick }) => {
  const userData: UserData = useSelector(
    (state: RootState) => state.userData.userData
  );

  const onUserClick = () => onClick(userData.username);

  return (
    <ButtonDropdownElement onClick={onUserClick}>
      <div className="flex gap-[8px]">
        <div className="w-[60px] h-[60px]">
          <div className="w-full h-full rounded-full bg-[whitesmoke] flex justify-center items-center text-[24px]">
            {userData.firstName?.[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div>{`${userData.firstName} ${userData.lastName || ''}`.trim()}</div>
          <div className="font-normal text-[14px]">{userData.email}</div>
        </div>
      </div>
    </ButtonDropdownElement>
  );
};

export default UserCard;
