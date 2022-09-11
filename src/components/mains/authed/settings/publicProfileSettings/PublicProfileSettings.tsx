import React from 'react';
import { UserData } from '../../../../../common/types/user-types/UserData';
import EditProfileForm from './editProfileSettings/EditProfileForm';
import useTranslation from 'next-translate/useTranslation';

type Props = { userData: UserData };

const PublicProfileSettings: React.FC<Props> = ({ userData }) => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-[18px] max-w-[630px]">
      <h2 className="font-normal text-[28px]">{t('tabs.public-profile')}</h2>
      <p>{t('public-profile.subtitle')}</p>
      <EditProfileForm userData={userData} />
    </div>
  );
};

export default PublicProfileSettings;
