import React from 'react';
import Layout from '../../src/components/layout/Layout';
import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import PublicProfileSettings from '../../src/components/mains/authed/settings/publicProfileSettings/PublicProfileSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';
import { mobileCheck } from '../../src/common/utils/mobileCheck/mobileCheck';
import useTranslation from 'next-translate/useTranslation';
import SettingsMobilePageWrapper from '../../src/components/mains/authed/settings/settingsMobilePageWrapper/SettingsMobilePageWrapper';

export default function EditProfile(props) {
  const isMobile = mobileCheck();
  const { t } = useTranslation('settings');

  if (isMobile) {
    return (
      <SettingsMobilePageWrapper title={t('tabs.public-profile')}>
        <PublicProfileSettings userData={props.userData} />
      </SettingsMobilePageWrapper>
    );
  }

  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.PUBLIC_PROFILE}>
        <PublicProfileSettings userData={props.userData} />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  return await mapUserDataWithJWTCheck(headers.cookie);
};
