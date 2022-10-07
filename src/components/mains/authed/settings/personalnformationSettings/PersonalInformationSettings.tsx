import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import PersonalDataForm from './personalDataForm/PersonalDataForm';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';

type Props = { userData: UserDataEntity };

const PersonalInformationSettings: React.FC<Props> = ({ userData }) => {
    console.log(userData);
  const { t } = useTranslation('settings');
  return (
    <div className="flex flex-col gap-[18px] max-w-[630px]">
      <h2 className="font-normal text-[28px]">{t('tabs.personal-data')}</h2>
      <p>{t('personal-data.subtitle')}</p>
      <PersonalDataForm userData={userData}  />
    </div>
  );
};

export default PersonalInformationSettings;
