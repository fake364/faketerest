import Layout from '../../src/components/layout/Layout';
import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import React from 'react';
import AccountSettings from '../../src/components/mains/authed/settings/accountSettings/AccountSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';
import { mobileCheck } from '../../src/common/utils/mobileCheck/mobileCheck';
import useTranslation from 'next-translate/useTranslation';
import SettingsMobilePageWrapper from '../../src/components/mains/authed/settings/settingsMobilePageWrapper/SettingsMobilePageWrapper';

export default function AccountSettingsPage(props) {
  const isMobile = mobileCheck();
  const { t } = useTranslation('settings');

  if (isMobile) {
    return (
      <SettingsMobilePageWrapper title={t('tabs.manage-account')}>
        <AccountSettings userData={props.userData} />
      </SettingsMobilePageWrapper>
    );
  }

  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.ACCOUNT_SETTINGS}>
        <AccountSettings userData={props.userData} />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  return await mapUserDataWithJWTCheck(headers.cookie);
};
