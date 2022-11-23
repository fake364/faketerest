import React, { Dispatch, SetStateAction, useCallback } from 'react';
import CommonInput from '../../../../../../../common/components/inputs/commonInput/CommonInput';
import ChatWindow from '../chatWindow/ChatWindow';
import ChatLoading from '../chatWindow/loadingScreen/ChatLoading';
import UserDialogElement from '../userDialogElement/UserDialogElement';
import debounce from 'lodash/debounce';
import UserDataEntity from '../../../../../../../common/backend/validation-services/registration/UserDataEntity';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/types';
import clsx from 'clsx';
import { mobileCheck } from '../../../../../../../common/utils/mobileCheck/mobileCheck';

type Props = {
  className?: string;
  onChangeSearch: React.ChangeEventHandler<HTMLInputElement>;
  selectedUser: UserDataEntity;
  areUsersLoading: boolean;
  displayedUsers: UserDataEntity[];
  selectUser: Dispatch<SetStateAction<UserDataEntity>>;
};

const Inbox: React.FC<Props> = ({
  className,
  onChangeSearch,
  selectedUser,
  areUsersLoading,
  displayedUsers,
  selectUser
}) => {
  const messagesState = useSelector((state: RootState) => state.messages);

  const debouncedChangeHandler = useCallback(debounce(onChangeSearch, 800), []);

  const onBackChatWindow = () => {
    selectUser(undefined);
  };

  return (
    <div className={className}>
      <div>
        <CommonInput
          placeholder={'Find user by name or username'}
          onChange={debouncedChangeHandler}
        />
      </div>
      {selectedUser && (
        <ChatWindow
          firstName={selectedUser.firstName}
          className={clsx(
            'absolute w-full h-full left-0 top-0 bg-white z-[15]',
            mobileCheck() && 'p-[12px]'
          )}
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
  );
};

export default Inbox;
