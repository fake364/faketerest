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
import useTranslation from 'next-translate/useTranslation';
import { FaUserAltSlash } from '@react-icons/all-files/fa/FaUserAltSlash';

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
  const { t } = useTranslation('common');
  const messagesState = useSelector((state: RootState) => state.messages);

  const debouncedChangeHandler = useCallback(debounce(onChangeSearch, 800), []);

  const onBackChatWindow = () => {
    selectUser(undefined);
  };

  const listResult =
    displayedUsers?.length > 0 ? (
      displayedUsers.map((user) => {
        const unreadMessagesCount = messagesState.messagesMap[user.id]?.length;
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
    ) : (
      <div
        className={
          'flex flex-col items-center justify-center text-[#737373] absolute h-full z-[0]'
        }
      >
        <FaUserAltSlash className={'text-[64px]'} />
        <div className={'mt-[18px] text-[24px] text-center'}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
          There are no users you've had chated yet
        </div>
      </div>
    );

  const inboxBody = areUsersLoading ? <ChatLoading /> : listResult;

  return (
    <div className={className}>
      <div className={'relative z-[1]'}>
        <CommonInput
          placeholder={t('findPeopleBy')}
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

      {areUsersLoading ? <ChatLoading /> : inboxBody}
    </div>
  );
};

export default Inbox;
