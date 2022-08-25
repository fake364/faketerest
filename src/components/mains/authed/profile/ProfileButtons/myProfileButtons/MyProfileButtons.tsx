import React from 'react';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = {};

const MyProfileButtons: React.FC<Props> = () => {
  return (
    <>
      <SecondaryButton className="text-[18px] font-normal !px-[22px]">
        Поделиться
      </SecondaryButton>
      <SecondaryButton className="text-[18px] font-normal !px-[22px]">
        Изменить профиль
      </SecondaryButton>
    </>
  );
};

export default MyProfileButtons;
