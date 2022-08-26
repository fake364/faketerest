import Link from 'next/link';
import React from 'react';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = {};

const MyProfileButtons: React.FC<Props> = () => {
  return (
    <>
      <SecondaryButton className="text-[18px] font-normal !px-[22px]">
        Поделиться
      </SecondaryButton>
      <Link href={'/settings/edit-profile'}>
        <SecondaryButton className="text-[18px] font-normal !px-[22px]">
          Изменить профиль
        </SecondaryButton>
      </Link>
    </>
  );
};

export default MyProfileButtons;
