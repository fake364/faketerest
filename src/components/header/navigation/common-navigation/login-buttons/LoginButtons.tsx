import React from 'react';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

type Props = {};

const LoginButtons: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');
  const router = useRouter();

  const onClickLogin = async () => {
    await router.push('/login');
  };

  const onClickRegistration = async () => {
    await router.push('/signup');
  };

  return (
    <>
      <PrimaryButton className="mr-[8px]" onClick={onClickLogin}>
        {t('loginButtons.login')}
      </PrimaryButton>
      <SecondaryButton onClick={onClickRegistration}>
        {t('loginButtons.register')}
      </SecondaryButton>
    </>
  );
};

export default LoginButtons;
