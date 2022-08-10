import React from 'react';
import Tooltip from '../../../../../../common/components/tooltip/Tooltip';
import { UserData } from '../../../../../../common/types/user-types/UserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';

type Props = {};

const UserRoundButton: React.FC<Props> = () => {
  const userData: UserData | undefined = useSelector(
    (state: RootState) => state.userData.userData
  );
  return (
    <Tooltip text={'Профиль'}>
      {userData?.email && (
        <div
          className=" transition-all duration-[300ms] hover:bg-[#f0f0f0] rounded-[50%]
         active:scale-75 items-baseline px-[10px] h-full flex !items-center justify-center
      cursor-pointer"
        >
          <div className="bg-[#f0f0f0] rounded-[50%] px-[10px] py-[3px]">
            {userData?.firstName[0].toUpperCase()}
          </div>
        </div>
      )}
    </Tooltip>
  );
};

export default UserRoundButton;
