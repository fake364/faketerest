import React from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import UserCard from './userCard/UserCard';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useLogout from '../../../../../../common/hooks/useLogout/useLogout';

type Props = {};

const ParamsArrowDropdown: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onLogoutClick = useLogout();

  const onSettingsClick = async () => {
    await router.push('/settings/edit-profile');
  };

  const onUserClick = async (username: string) => {
    await router.push('/' + username);
  };

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaChevronDown}
      dropdownClass={'right-[0] px-[10px] py-[16px] min-w-[360px] z-[10]'}
    >
      <div className="text-[12px] ml-[12px]">{t('user-dropdown.now')}:</div>
      <UserCard onClick={onUserClick} />
      {/*<div className="text-[12px] ml-[12px] my-[12px]">*/}
      {/*  {t('user-dropdown.your-accounts')}*/}
      {/*</div>*/}
      {/*<ButtonDropdownElement onClick={null}>*/}
      {/*  {t('user-dropdown.add-account')}*/}
      {/*</ButtonDropdownElement>*/}
      {/*<ButtonDropdownElement onClick={null}>*/}
      {/*  {t('user-dropdown.switch-to-business')}*/}
      {/*</ButtonDropdownElement>*/}
      <div className="text-[12px] ml-[12px] my-[12px]">
        {t('user-dropdown.additional')}
      </div>
      <ButtonDropdownElement onClick={onSettingsClick}>
        {t('user-dropdown.settings')}
      </ButtonDropdownElement>
      {/*<ButtonDropdownElement onClick={null}>*/}
      {/*  {t('user-dropdown.setup-feed')}*/}
      {/*</ButtonDropdownElement>*/}
      {/*<ButtonDropdownElement onClick={null}>*/}
      {/*  {t('user-dropdown.setup-app')}*/}
      {/*</ButtonDropdownElement>*/}
      {/*<ButtonDropdownElement onClick={null}>*/}
      {/*  {t('user-dropdown.get-reference')}*/}
      {/*</ButtonDropdownElement>*/}
      <ButtonDropdownElement onClick={onLogoutClick}>
        {t('user-dropdown.logout')}
      </ButtonDropdownElement>
    </DropdownRootElement>
  );
};

export default ParamsArrowDropdown;
