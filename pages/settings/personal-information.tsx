import SettingsContainer from '../../src/components/mains/authed/settings/SettingsContainer';
import { SETTINGS_TAB } from '../../src/components/mains/authed/settings/sideMenu/SettingsSideMenu';
import Layout from '../../src/components/layout/Layout';
import React from 'react';
import PersonalInformationSettings from '../../src/components/mains/authed/settings/personalnformationSettings/PersonalInformationSettings';
import { mapUserDataWithJWTCheck } from '../../src/common/backend/utils/withServerSideProps/utils';
import CountriesService from '../../src/common/backend/services/countriesService/CountriesService';
import { sortCountriesAlphabetically } from '../../src/common/utils/functional-utils/sort-functions/common';
import UserDataEntity from '../../src/common/backend/validation-services/registration/UserDataEntity';

export default function PersonalInformation(props) {
  return (
    <Layout>
      <SettingsContainer selectedTab={SETTINGS_TAB.PERSONAL_DATA}>
        <PersonalInformationSettings
          userData={props.userData}
          countries={props.countries}
        />
      </SettingsContainer>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { headers } }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res: {
    props: {
      userData: UserDataEntity;
      countries: { label: string; code: string }[];
    };
  } = await mapUserDataWithJWTCheck(headers.cookie);
  if (res.props) {
    try {
      res.props.countries = (
        await CountriesService.getAvailableCountriesList()
      ).sort(sortCountriesAlphabetically);
      if (!res.props.countries?.length) {
        return {
          redirect: {
            permanent: true,
            destination: '/'
          }
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
  return res;
};
