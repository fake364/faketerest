import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import RegForm from './form/RegForm';

type Props = {};

const RegistrationFormWrapper: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');
  const [isRegistrationShown, setRegistration] = useState<boolean>(true);

  return (
    <div className="main-reg-form">
      <h1 className="text-[70px] text-white max-w-[600px]">
        {t('regForm.header')}
      </h1>
      <RegForm isRegistrationShown={isRegistrationShown} setRegistrationShown={setRegistration} />
    </div>
  );
};

export default RegistrationFormWrapper;
