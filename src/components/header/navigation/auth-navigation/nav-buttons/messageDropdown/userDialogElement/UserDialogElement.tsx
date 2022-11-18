import React, { useContext } from 'react';
import UserAvatarImage from '../../user-button/user-image/UserAvatarImage';
import getFirstLastName from '../../../../../../../common/utils/firstLastNameCreate/getFirstLastName';
import { THEME_TYPE } from '../../../../../../../common/enums/theme';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import ThemeContext from '../../../../../../../common/context/ThemeContext';

type Props = {
  unreadMessagesCount: number;
  userId: number;
  firstName: string;
  lastName?: string;
  onOpen: () => void;
};

const UserDialogElement: React.FC<Props> = ({
  unreadMessagesCount,
  userId,
  firstName,
  lastName,
  onOpen
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ButtonDropdownElement onClick={onOpen}>
      <div className="flex items-center gap-[12px]">
        <UserAvatarImage
          userId={userId}
          firstName={firstName}
          className={'w-[50px] h-[50px]'}
        />
        <div className={'flex flex-1'}>
          <div className={'flex-1'}>
            {getFirstLastName(firstName, lastName)}
          </div>
          {unreadMessagesCount > 0 && (
            <div
              data-theme={theme ? theme : THEME_TYPE.BASE}
              className={
                'w-[25px] h-[25px] text-[14px] rounded-[50%] bg-primary text-text_primary flex justify-center items-center'
              }
            >
              {unreadMessagesCount}
            </div>
          )}
        </div>
      </div>
    </ButtonDropdownElement>
  );
};

export default UserDialogElement;
