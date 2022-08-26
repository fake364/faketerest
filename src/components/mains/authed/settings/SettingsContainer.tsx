import React from 'react';
import SettingsSideMenu, { SETTINGS_TAB } from './sideMenu/SettingsSideMenu';

type Props = { selectedTab: SETTINGS_TAB };

const SettingsContainer: React.FC<Props> = ({ selectedTab, children }) => {
  return (
    <div className="flex mt-[48px] gap-[62px]">
      <SettingsSideMenu selectedTab={selectedTab} />
      {children}
    </div>
  );
};

export default SettingsContainer;
