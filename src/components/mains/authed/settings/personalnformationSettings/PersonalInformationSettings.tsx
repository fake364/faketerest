import React from 'react';
import { UserData } from '../../../../../common/types/user-types/UserData';
import useTranslation from 'next-translate/useTranslation';

type Props = { userData: UserData };

const PersonalInformationSettings: React.FC<Props> = ({ userData }) => {
  const { t } = useTranslation('settings');
  return (
    <div className="flex flex-col gap-[18px] max-w-[630px]">
      <h2 className="font-normal text-[28px]">{t('tabs.personal-data')}</h2>
      <p>{t('personal-data.subtitle')}</p>

    </div>
  );
};

export default PersonalInformationSettings;
