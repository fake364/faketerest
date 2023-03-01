import React from 'react';
import TopBackAndTitlePanel from '../../../../header/navigation/auth-navigation/nav-buttons/messageDropdown/chatWindow/chatTopPanel/TopBackAndTitlePanel';
import { useRouter } from 'next/router';

type Props = { title: string };

const SettingsMobilePageWrapper: React.FC<Props> = ({ title, children }) => {
  const router = useRouter();
  const onBack = () => {
    router.push('/settings');
  };

  return (
    <div>
      <TopBackAndTitlePanel
        onBack={onBack}
        title={title}
        className={'sticky'}
      />
      <div className={'p-[12px]'}>{children}</div>
    </div>
  );
};

export default SettingsMobilePageWrapper;
