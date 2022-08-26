import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import PublicProfileSettings from '../../src/components/mains/authed/settings/publicProfileSettings/PublicProfileSettings';
import Layout from '../../src/components/layout/Layout';
import React from 'react';
import PersonalInformationSettings from '../../src/components/mains/authed/settings/personalnformationSettings/PersonalInformationSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';

export default function PersonalInformation() {
  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.PERSONAL_DATA}>
        <PersonalInformationSettings />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  return await mapUserDataWithJWTCheck(headers.cookie);
};
