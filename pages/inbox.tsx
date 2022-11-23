import React from 'react';
import useOnlyMobilePage from '../src/common/hooks/useOnlyMobilePage/useOnlyMobilePage';
import Layout from '../src/components/layout/Layout';
import NotificationsTabs, {
  NOTIFICATION_TAB
} from '../src/common/components/notificationsTabs/NotificationsTabs';
import Inbox from '../src/components/header/navigation/auth-navigation/nav-buttons/messageDropdown/inbox/Inbox';
import useInbox from '../src/common/hooks/useInbox/useInbox';

export default function InboxPage(props) {
  useOnlyMobilePage();
  const {
    selectUser,
    selectedUser,
    displayedUsers,
    areUsersLoading,
    onChangeSearch
  } = useInbox();

  return (
    <Layout>
      <div>
        <NotificationsTabs selectedTab={NOTIFICATION_TAB.INBOX} />
      </div>
      <Inbox
        className={'mt-[24px] p-[12px]'}
        onChangeSearch={onChangeSearch}
        selectedUser={selectedUser}
        areUsersLoading={areUsersLoading}
        displayedUsers={displayedUsers}
        selectUser={selectUser}
      />
    </Layout>
  );
}
