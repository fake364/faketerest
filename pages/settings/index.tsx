import React from 'react';
import useOnlyMobilePage from '../../src/common/hooks/useOnlyMobilePage/useOnlyMobilePage';
import TopBackAndTitlePanel from '../../src/components/header/navigation/auth-navigation/nav-buttons/messageDropdown/chatWindow/chatTopPanel/TopBackAndTitlePanel';
import { useRouter } from 'next/router';
import ChevronLinkButton from '../../src/common/components/buttons/chevronLinkButton/ChevronLinkButton';
import useLogout from '../../src/common/hooks/useLogout/useLogout';

export default function SettingsPage() {
  useOnlyMobilePage();
  const router = useRouter();
  const onLogoutClick = useLogout();

  const onBack = () => {
    router.back();
  };

  return (
    <div className={'flex flex-col'}>
      <TopBackAndTitlePanel
        onBack={onBack}
        title={'Settings'}
        className={'sticky'}
      />
      <div className={'w-full flex flex-col p-[16px] gap-[12px]'}>
        <div className={'text-[14px]'}>Информация об аккаунте</div>
        <ChevronLinkButton
          navigateTo={'/settings/account-settings'}
          title={'Account settings'}
        />
        <ChevronLinkButton
          navigateTo={'/settings/edit-profile'}
          title={'Edit profile'}
        />
        <ChevronLinkButton
          navigateTo={'/settings/personal-information'}
          title={'Personal information'}
        />
        <div className={'text-[14px]'}>Действия</div>
        <div className={'text-[16px] font-medium'} onClick={onLogoutClick}>
          Выйти
        </div>
      </div>
    </div>
  );
}
