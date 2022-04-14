import React from 'react';
import { useTranslation } from 'next-i18next';
import RegForm from './form/RegForm';

type Props = {};

const RegistrationFormWrapper: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');

  return (
    <div className="main-reg-form">
      <h1 className="text-[70px] text-white max-w-[600px]">{t('regForm.header')}</h1>
      <RegForm />
    </div>
  );
};

export default RegistrationFormWrapper;
