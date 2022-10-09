import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import PersonalDataForm from './personalDataForm/PersonalDataForm';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';
import { CountryObject } from '../../../../../common/types/common';
import SettingsPageWrapper from '../pageWrapper/SettingsPageWrapper';

type Props = {
  userData: UserDataEntity;
  countries: CountryObject[];
};

const PersonalInformationSettings: React.FC<Props> = ({
  userData,
  countries
}) => {
  const { t } = useTranslation('settings');
  return (
    <SettingsPageWrapper
      title={t('tabs.personal-data')}
      subtitle={t('personal-data.subtitle')}
    >
      <PersonalDataForm userData={userData} countries={countries} />
    </SettingsPageWrapper>
  );
};

export default PersonalInformationSettings;
