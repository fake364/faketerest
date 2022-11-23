import React from 'react';
import useOnlyMobilePage from '../src/common/hooks/useOnlyMobilePage/useOnlyMobilePage';
import Layout from '../src/components/layout/Layout';
import NotificationsTabs, {
  NOTIFICATION_TAB
} from '../src/common/components/notificationsTabs/NotificationsTabs';
import NotificationsBody from '../src/components/header/navigation/auth-navigation/nav-buttons/notificationDropdown/notificationsBody/NotificationsBody';

export default function NotificationsPage(props) {
  useOnlyMobilePage();

  return (
    <Layout>
      <div className={'absolute margin-auto w-full top-0 z-[10]'}>
        <NotificationsTabs selectedTab={NOTIFICATION_TAB.NOTIFICATIONS} />
      </div>
      <NotificationsBody className={'pt-[84px] w-full h-screen'} />
    </Layout>
  );
}
