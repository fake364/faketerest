import React from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import UserCard from './userCard/UserCard';
import { useDispatch } from 'react-redux';
import { setWipeState } from '../../../../../../redux/actions/metadata/actions';
import axios from 'axios';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const ParamsArrowDropdown: React.FC<Props> = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  const onSettingsClick = async () => {
    await router.push('/settings/edit-profile');
  };

  const onLogoutClick = async () => {
    try {
      await axios.get('/api/logout');
    } finally {
      await router.push('/');
      dispatch(setWipeState());
    }
  };

  const onUserClick = async (username: string) => {
    await router.push('/' + username);
  };

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaChevronDown}
      dropdownClass={'right-[0] px-[10px] py-[16px] min-w-[360px]'}
    >
      <div className="text-[12px] ml-[12px]">{t('user-dropdown.now')}:</div>
      <UserCard onClick={onUserClick} />
      <div className="text-[12px] ml-[12px] my-[12px]">
        {t('user-dropdown.your-accounts')}
      </div>
      <ButtonDropdownElement onClick={null}>
        {t('user-dropdown.add-account')}
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        {t('user-dropdown.switch-to-business')}
      </ButtonDropdownElement>
      <div className="text-[12px] ml-[12px] my-[12px]">
        {t('user-dropdown.additional')}
      </div>
      <ButtonDropdownElement onClick={onSettingsClick}>
        {t('user-dropdown.settings')}
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        {t('user-dropdown.setup-feed')}
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        {t('user-dropdown.setup-app')}
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        {t('user-dropdown.get-reference')}
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={onLogoutClick}>
        {t('user-dropdown.logout')}
      </ButtonDropdownElement>
    </DropdownRootElement>
  );
};

export default ParamsArrowDropdown;
