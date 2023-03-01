import React from 'react';
import useOnlyMobilePage from '../../src/common/hooks/useOnlyMobilePage/useOnlyMobilePage';
import TopBackAndTitlePanel from '../../src/components/header/navigation/auth-navigation/nav-buttons/messageDropdown/chatWindow/chatTopPanel/TopBackAndTitlePanel';
import { useRouter } from 'next/router';
import ChevronLinkButton from '../../src/common/components/buttons/chevronLinkButton/ChevronLinkButton';
import useLogout from '../../src/common/hooks/useLogout/useLogout';
import useTranslation from 'next-translate/useTranslation';

export default function SettingsPage() {
  useOnlyMobilePage();
  const { t } = useTranslation('settings');
  const { t: commonT } = useTranslation('common');
  const router = useRouter();
  const onLogoutClick = useLogout();

  const onBack = () => {
    router.push('/');
  };

  return (
    <div className={'flex flex-col'}>
      <TopBackAndTitlePanel
        onBack={onBack}
        title={commonT('user-dropdown.settings')}
        className={'sticky'}
      />
      <div className={'w-full flex flex-col p-[16px] gap-[12px]'}>
        <div className={'text-[14px]'}>{commonT('accountInformation')}</div>
        <ChevronLinkButton
          navigateTo={'/settings/account-settings'}
          title={t('tabs.manage-account')}
        />
        <ChevronLinkButton
          navigateTo={'/settings/edit-profile'}
          title={t('tabs.public-profile')}
        />
        <ChevronLinkButton
          navigateTo={'/settings/personal-information'}
          title={t('tabs.personal-data')}
        />
        <div className={'text-[14px]'}>{t('actions')}</div>
        <div className={'text-[16px] font-medium'} onClick={onLogoutClick}>
          {commonT('user-dropdown.logout')}
        </div>
      </div>
    </div>
  );
}
