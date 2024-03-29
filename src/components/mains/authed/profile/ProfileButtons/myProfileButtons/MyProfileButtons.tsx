import Link from 'next/link';
import React from 'react';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import useTranslation from 'next-translate/useTranslation';
import { mobileCheck } from '../../../../../../common/utils/mobileCheck/mobileCheck';

type Props = {};

const MyProfileButtons: React.FC<Props> = () => {
  const { t } = useTranslation('profile');
  const isMobile = mobileCheck();

  return (
    <>
      {/*<SecondaryButton className="text-[18px] font-normal !px-[22px]">*/}
      {/*  {t('share')}*/}
      {/*</SecondaryButton>*/}
      <Link href={isMobile ? '/settings' : '/settings/edit-profile'}>
        <SecondaryButton className="text-[18px] font-normal !px-[22px]">
          {t('editProfile')}
        </SecondaryButton>
      </Link>
    </>
  );
};

export default MyProfileButtons;
