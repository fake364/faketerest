import React from 'react';
import LogoTitle from '../common-navigation/logo-title/LogoTitle';
import BaseButton from '../../../../common/components/buttons/base/BaseButton';
import SearchInput from './search-input/SearchInput';
import DropdownRootElement from '../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import AuthNavButtons from './nav-buttons/AuthNavButtons';
import ParamsArrowDropdown from './nav-buttons/dropdown-arrow/ParamsArrowDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types';
import RegFormSpinner from '../../../mains/others/baseMain/regForm/form/spinner/RegFormSpinner';
import { UserData } from '../../../../common/types/user-types/UserData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import UserDataEntity from '../../../../common/backend/validation-services/registration/UserDataEntity';

type Props = {};

const AuthNavigation: React.FC<Props> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const onClickMain = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  const isUserLoading: boolean = useSelector(
    (state: RootState) => state.userData?.isLoading
  );
  const userData: UserDataEntity = useSelector(
    (state: RootState) => state.userData?.userData
  );

  if (isUserLoading || !userData) {
    return <RegFormSpinner />;
  }

  return (
    <nav className="sticky py-[18px] px-[12px] flex flex-stretch gap-[14px]">
      <Link href={'/'}>
        <div
          className=" transition-all duration-[300ms] hover:bg-[#f0f0f0] p-[12px] rounded-[50%]
         active:scale-75 items-baseline
      cursor-pointer"
        >
          <LogoTitle titleOff width={24} height={24} />
        </div>
      </Link>
      <BaseButton
        className="bg-[#000000] text-white rounded-[24px] px-[18px] mr-[8px]"
        onClick={onClickMain}
      >
        {t('header.main-page')}
      </BaseButton>
      <DropdownRootElement
        variant={'text'}
        text={t('header.create')}
        dropdownClass="left-[-57px]"
      >
        <ButtonDropdownElement onClick={null}>
          {t('header.create-fake-idea')}
        </ButtonDropdownElement>
        <Link href={'/fake-builder'}>
          <ButtonDropdownElement>
            {t('header.create-fake')}
          </ButtonDropdownElement>
        </Link>
      </DropdownRootElement>
      <SearchInput className="flex-1" />
      <AuthNavButtons />
      <ParamsArrowDropdown />
    </nav>
  );
};

export default AuthNavigation;
