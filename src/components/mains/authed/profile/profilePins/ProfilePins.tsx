import React, { useState } from 'react';
import TabButton from './TabButton';
import CreatedPins from './createdPins/CreatedPins';
import SavedPins from './savedPins/SavedPins';

type Props = {};

enum PROFILE_TAB {
  CREATED = 'CREATED',
  SAVED = 'SAVED'
}

const PROFILE_TABS = [PROFILE_TAB.CREATED, PROFILE_TAB.SAVED];

const ProfilePins: React.FC<Props> = () => {
  const [currentTab, setTab] = useState<PROFILE_TAB>(PROFILE_TAB.SAVED);

  const onClickCreated = () => setTab(PROFILE_TAB.CREATED);

  const onClickSaved = () => setTab(PROFILE_TAB.SAVED);

  return (
    <div className="mt-[48px] flex flex-col w-full items-center gap-[32px]">
      <div className="flex gap-[12px]">
        <TabButton
          isActive={currentTab === PROFILE_TAB.CREATED}
          onClick={onClickCreated}
        >
          Созданные
        </TabButton>
        <TabButton
          isActive={currentTab === PROFILE_TAB.SAVED}
          onClick={onClickSaved}
        >
          Сохраненные
        </TabButton>
      </div>
      {currentTab === PROFILE_TAB.CREATED && <CreatedPins />}
      {currentTab === PROFILE_TAB.SAVED && <SavedPins />}
    </div>
  );
};

export default ProfilePins;
