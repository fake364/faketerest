import React from 'react';
import TabButton from '../../../components/mains/authed/profile/profilePins/TabButton';
import { useRouter } from 'next/router';

type Props = { selectedTab: NOTIFICATION_TAB };

export enum NOTIFICATION_TAB {
  NOTIFICATIONS = 'NOTIFICATIONS',
  INBOX = 'INBOX'
}

const NotificationsTab: React.FC<Props> = ({ selectedTab }) => {
  const router = useRouter();
  const onClickTab = async (tab: NOTIFICATION_TAB) => {
    if (tab === NOTIFICATION_TAB.NOTIFICATIONS) {
      await router.push('/notifications');
    } else if (tab === NOTIFICATION_TAB.INBOX) {
      await router.push('/inbox');
    }
  };

  return (
    <div className={'w-full flex gap-[8px] justify-center mt-[24px]'}>
      <TabButton
        isActive={selectedTab === NOTIFICATION_TAB.NOTIFICATIONS}
        onClick={() => onClickTab(NOTIFICATION_TAB.NOTIFICATIONS)}
      >
        Notifications
      </TabButton>
      <TabButton
        isActive={selectedTab === NOTIFICATION_TAB.INBOX}
        onClick={() => onClickTab(NOTIFICATION_TAB.INBOX)}
      >
        Inbox
      </TabButton>
    </div>
  );
};

export default NotificationsTab;
