import Link from 'next/link';
import React from 'react';
import TabButton from '../../profile/profilePins/TabButton';

type Props = { selectedTab: SETTINGS_TAB };

export enum SETTINGS_TAB {
  PUBLIC_PROFILE = 'PUBLIC_PROFILE',
  PERSONAL_DATA = 'PERSONAL_DATA',
  ACCOUNT_SETTINGS = 'ACCOUNT_SETTINGS'
}

const SettingsSideMenu: React.FC<Props> = ({ selectedTab }) => {
  return (
    <div className="flex flex-col ml-[32px] gap-[12px] max-w-[400px]">
      <Link href={'/settings/edit-profile'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.PUBLIC_PROFILE}>
          Общедоступный профиль
        </TabButton>
      </Link>
      <Link href={'/settings/personal-information'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.PERSONAL_DATA}>
          Персональные данные
        </TabButton>
      </Link>
      <Link href={'/settings/account-settings'}>
        <TabButton isActive={selectedTab === SETTINGS_TAB.ACCOUNT_SETTINGS}>
          Управление аккаунтом
        </TabButton>
      </Link>
    </div>
  );
};

export default SettingsSideMenu;
