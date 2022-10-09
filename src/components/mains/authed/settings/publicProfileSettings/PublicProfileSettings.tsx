import React from 'react';
import EditProfileForm from './editProfileSettings/EditProfileForm';
import useTranslation from 'next-translate/useTranslation';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';
import SettingsPageWrapper from '../pageWrapper/SettingsPageWrapper';

type Props = { userData: UserDataEntity };

const PublicProfileSettings: React.FC<Props> = ({ userData }) => {
  const { t } = useTranslation('settings');

  return (
    <SettingsPageWrapper
      title={t('tabs.public-profile')}
      subtitle={t('public-profile.subtitle')}
    >
      <EditProfileForm userData={userData} />
    </SettingsPageWrapper>
  );
};

export default PublicProfileSettings;
