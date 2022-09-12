import Link from 'next/link';
import React from 'react';
import TabButton from '../../profile/profilePins/TabButton';
import useTranslation from 'next-translate/useTranslation';

type Props = { selectedTab: SETTINGS_TAB };

export enum SETTINGS_TAB {
  PUBLIC_PROFILE = 'PUBLIC_PROFILE',
  PERSONAL_DATA = 'PERSONAL_DATA',
  ACCOUNT_SETTINGS = 'ACCOUNT_SETTINGS'
}

const SettingsSideMenu: React.FC<Props> = ({ selectedTab }) => {
  const { t } = useTranslation('settings');
  return (
    <div className="flex flex-col ml-[32px] gap-[12px] max-w-[400px]">
      <Link href={'/settings/edit-profile'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.PUBLIC_PROFILE}>
          {t('tabs.public-profile')}
        </TabButton>
      </Link>
      <Link href={'/settings/personal-information'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.PERSONAL_DATA}>
          {t('tabs.personal-data')}
        </TabButton>
      </Link>
      <Link href={'/settings/account-settings'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.ACCOUNT_SETTINGS}>
          {t('tabs.manage-account')}
        </TabButton>
      </Link>
    </div>
  );
};

export default SettingsSideMenu;
