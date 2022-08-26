import Layout from '../../src/components/layout/Layout';
import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import React from 'react';
import AccountSettings from '../../src/components/mains/authed/settings/accountSettings/AccountSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';

export default function AccountSettingsPage(props) {
  console.log(props);
  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.ACCOUNT_SETTINGS}>
        <AccountSettings />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  return await mapUserDataWithJWTCheck(headers.cookie);
};
