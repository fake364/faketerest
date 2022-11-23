import React from 'react';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import style from './MessageDropdown.module.css';
import clsx from 'clsx';
import useInbox from '../../../../../../common/hooks/useInbox/useInbox';
import Inbox from './inbox/Inbox';

type Props = {};

const MessageDropdown: React.FC<Props> = () => {
  const {
    selectedUser,
    selectUser,
    displayedUsers,
    areUsersLoading,
    onChangeSearch
  } = useInbox();

  const onCloseDropdown = () => {
    selectUser(undefined);
  };

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
      <Inbox
        className={clsx(style.dropdownBody)}
        displayedUsers={displayedUsers}
        areUsersLoading={areUsersLoading}
        selectUser={selectUser}
        selectedUser={selectedUser}
        onChangeSearch={onChangeSearch}
      />
    </DropdownRootElement>
  );
};

export default MessageDropdown;
