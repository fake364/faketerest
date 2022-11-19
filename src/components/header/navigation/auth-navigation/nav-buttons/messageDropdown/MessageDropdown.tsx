import React, { ChangeEventHandler, useCallback, useState } from 'react';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import style from './MessageDropdown.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import axios from 'axios';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import clsx from 'clsx';
import ChatWindow from './chatWindow/ChatWindow';
import CommonInput from '../../../../../../common/components/inputs/commonInput/CommonInput';
import { SearchUserPayload } from '../../../../../../common/backend/services/registrationService/types/types';
import debounce from 'lodash/debounce';
import ChatLoading from './chatWindow/loadingScreen/ChatLoading';
import UserDialogElement from './userDialogElement/UserDialogElement';

type Props = {};

const MessageDropdown: React.FC<Props> = () => {
  const [searchedUsers, setUsers] = useState<UserDataEntity[]>([]);
  const [selectedUser, selectUser] = useState<UserDataEntity>();
  const [areUsersLoading, setLoading] = useState<boolean>(false);
  const messagesState = useSelector((state: RootState) => state.messages);

  const fetchUserIds = async (ids: number[]) => {
    setLoading(true);
    const usersResponses = await Promise.all(
      ids.map((id) => axios.get('/api/registration/' + id))
    );
    const mapped = usersResponses.map((response) => response.data);
    setLoading(false);
    setUsers(mapped);
    return mapped;
  };

  const onCloseDropdown = () => {
    selectUser(undefined);
  };

  const onBackChatWindow = () => {
    selectUser(undefined);
  };
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const value = e.target.value.trim();
    if (value) {
      const { data } = await axios.get<SearchUserPayload[]>(
        '/api/registration/search',
        {
          params: { text: value }
        }
      );
      const ids = data.map(({ id }) => id);
      await fetchUserIds(ids);
    } else {
      setUsers([]);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(onChangeSearch, 800), []);

  const displayedUsers: UserDataEntity[] =
    searchedUsers.length > 0
      ? searchedUsers
      : Object.values(messagesState.usersMap);

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaCommentDots}
      className="px-[12px]"
      dropdownClass={style.dropdownContainer}
      buttonClass={'!text-[22px]'}
      tooltipText={'Messages'}
      onClose={onCloseDropdown}
    >
      <div className={clsx(style.dropdownBody)}>
        <div>
          <CommonInput
            placeholder={'Find user by name or username'}
            onChange={debouncedChangeHandler}
          />
        </div>
        {selectedUser && (
          <ChatWindow
            firstName={selectedUser.firstName}
            className={'absolute w-full h-full left-0 top-0 bg-white z-[15]'}
            onBack={onBackChatWindow}
            participantId={selectedUser.id}
          />
        )}

        {areUsersLoading ? (
          <ChatLoading />
        ) : (
          displayedUsers?.map((user) => {
            const unreadMessagesCount =
              messagesState.messagesMap[user.id]?.length;
            return (
              <UserDialogElement
                unreadMessagesCount={unreadMessagesCount}
                userId={user.id}
                firstName={user.firstName}
                onOpen={() => {
                  selectUser(user);
                }}
                lastName={user.lastName}
              />
            );
          })
        )}
      </div>
    </DropdownRootElement>
  );
};

export default MessageDropdown;
