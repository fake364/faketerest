import React, { useEffect, useState } from 'react';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import style from './MessageDropdown.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import axios from 'axios';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import clsx from 'clsx';
import getFirstLastName from '../../../../../../common/utils/firstLastNameCreate/getFirstLastName';
import UserAvatarImage from '../user-button/user-image/UserAvatarImage';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import ChatWindow from './chatWindow/ChatWindow';

type Props = {};

const MessageDropdown: React.FC<Props> = () => {
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const [usersObjects, setUsers] = useState<UserDataEntity[]>();
  const [selectedUser, selectUser] = useState<UserDataEntity>();

  const fetchUserSubscriptions = async () => {
    const result = await axios.get<number[]>('/api/subscription/user', {
      params: { userId: myId }
    });
    const usersResponses = await Promise.all(
      result.data.map((id) => axios.get('/api/registration/' + id))
    );
    const mapped = usersResponses.map((response) => response.data);
    setUsers(mapped);
  };

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  const onCloseDropdown = () => {
    selectUser(undefined);
  };

  const onBackChatWindow = () => {
    selectUser(undefined);
  };

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaCommentDots}
      className="px-[12px]"
      onClick={null}
      dropdownClass={style.dropdownContainer}
      buttonClass={'!text-[22px]'}
      tooltipText={'Messages'}
      onClose={onCloseDropdown}
    >
      <div className={clsx(style.dropdownBody)}>
        {selectedUser && (
          <ChatWindow
            firstName={selectedUser.firstName}
            participantUsername={selectedUser.username}
            className={'absolute w-full h-full left-0 top-0 bg-white z-[15]'}
            onBack={onBackChatWindow}
            participantId={selectedUser.id}
          />
        )}
        {usersObjects?.map((user) => (
          <ButtonDropdownElement
            onClick={() => {
              selectUser(user);
            }}
          >
            <div className="flex items-center gap-[12px]">
              <UserAvatarImage
                userId={user.id}
                firstName={user.firstName}
                className={'w-[50px] h-[50px]'}
              />
              <div>{getFirstLastName(user.firstName, user.lastName)}</div>
            </div>
          </ButtonDropdownElement>
        ))}
      </div>
    </DropdownRootElement>
  );
};

export default MessageDropdown;
