import React, { useState } from 'react';
import TabButton from './TabButton';
import CreatedPins from './createdPins/CreatedPins';
import SavedPins from './savedPins/SavedPins';
import useTranslation from 'next-translate/useTranslation';

type Props = { userId: number; username: string };

enum PROFILE_TAB {
  CREATED = 'CREATED',
  SAVED = 'SAVED'
}

const PROFILE_TABS = [PROFILE_TAB.CREATED, PROFILE_TAB.SAVED];

const ProfilePins: React.FC<Props> = ({ userId, username }) => {
  const { t } = useTranslation('profile');
  const [currentTab, setTab] = useState<PROFILE_TAB>(PROFILE_TAB.CREATED);

  const onClickCreated = () => setTab(PROFILE_TAB.CREATED);

  const onClickSaved = () => setTab(PROFILE_TAB.SAVED);

  return (
    <div className="mt-[48px] flex flex-col w-full items-center gap-[32px]">
      <div className="flex gap-[12px]">
        <TabButton
          isActive={currentTab === PROFILE_TAB.CREATED}
          onClick={onClickCreated}
        >
          {t('created')}
        </TabButton>
        <TabButton
          isActive={currentTab === PROFILE_TAB.SAVED}
          onClick={onClickSaved}
          disabled
        >
          {t('saved')}
        </TabButton>
      </div>
      {currentTab === PROFILE_TAB.CREATED && (
        <CreatedPins userId={userId} username={username} />
      )}
      {currentTab === PROFILE_TAB.SAVED && <SavedPins />}
    </div>
  );
};

export default ProfilePins;
