import React from 'react';
import LogoTitle from '../common-navigation/logo-title/LogoTitle';
import BaseButton from '../../../../common/components/buttons/base/BaseButton';
import SearchInput from './searchInput/SearchInput';
import CircleIconButton from '../../../../common/components/buttons/CircleIconButton';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import ButtonDropdown from '../../../../common/components/buttons/buttonDropdown/ButtonDropdown';
import ButtonDropdownElement from '../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types';
import { UserData } from '../../../../common/types/user-types/UserData';

type Props = {};

const AuthNavigation: React.FC<Props> = () => {
  const userData: UserData | undefined = useSelector(
    (state: RootState) => state.userData.userData
  );

  return (
    <nav className="sticky py-[18px] px-[12px] flex flex-stretch gap-[14px]">
      <div
        className=" transition-all duration-[300ms] hover:bg-[#f0f0f0] p-[12px] rounded-[50%]
         active:scale-75 items-baseline
      cursor-pointer"
      >
        <LogoTitle titleOff width={24} height={24} />
      </div>
      <BaseButton className="bg-[#000000] text-white rounded-[24px] px-[18px]">
        Главная
      </BaseButton>
      <ButtonDropdown>
        <ButtonDropdownElement onClick={() => {}}>
          Создать пин-идею
        </ButtonDropdownElement>
        <ButtonDropdownElement onClick={() => null}>
          Создать пин
        </ButtonDropdownElement>
      </ButtonDropdown>
      <SearchInput className="flex-1" />
      <CircleIconButton
        Icon={FaBell}
        className="px-[12px]"
        onClick={() => null}
      />
      <CircleIconButton
        Icon={FaCommentDots}
        className="px-[12px]"
        onClick={() => null}
      />
      {userData?.email && (
        <div
          className=" transition-all duration-[300ms] hover:bg-[#f0f0f0] p-[12px] rounded-[50%]
         active:scale-75 items-baseline
      cursor-pointer"
        >
          {userData?.email[0].toUpperCase()}
        </div>
      )}
    </nav>
  );
};

export default AuthNavigation;
