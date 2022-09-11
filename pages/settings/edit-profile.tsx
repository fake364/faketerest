import React from 'react';
import Layout from '../../src/components/layout/Layout';
import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import PublicProfileSettings from '../../src/components/mains/authed/settings/publicProfileSettings/PublicProfileSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function EditProfile(props) {
  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.PUBLIC_PROFILE}>
        <PublicProfileSettings userData={props} />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  return await mapUserDataWithJWTCheck(headers.cookie);
};

