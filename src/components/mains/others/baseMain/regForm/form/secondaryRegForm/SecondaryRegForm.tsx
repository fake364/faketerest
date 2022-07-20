import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

type Props = { onTriggerFormMode?: () => void; isRegistrationForm: boolean };

const SecondaryRegForm: React.FC<Props> = ({
  onTriggerFormMode,
  isRegistrationForm
}) => {
  const { t } = useTranslation('main-page');

  return (
    <>
      <div className="mt-[14px] text-center text-[12px] text-gray-600">
        {t('regForm.form.terms.youAgreeWith')}{' '}
        <span className="font-bold whitespace-nowrap">
          <Link href={'/tos'}>{t('regForm.form.terms.termsOfService')}</Link>
        </span>{' '}
        {t('regForm.form.terms.youVeRead')}{' '}
        <span className="font-bold whitespace-nowrap">
          <Link href={'/privacy'}>{t('regForm.form.terms.privacyPolicy')}</Link>
        </span>
      </div>
      {onTriggerFormMode && (
        <div
          className="mt-[12px] text-[13px] text-center text-gray-600 cursor-pointer font-semibold"
          onClick={onTriggerFormMode}
        >
          {!isRegistrationForm
            ? t('regForm.form.registerLink')
            : t('regForm.form.logInLink')}
        </div>
      )}
      <div className=" mt-[10px] text-[13px] text-center text-gray-600 font-semibold pb-[14px]">
        {t('regForm.form.areYouABusiness')}{' '}
        <span>
          <Link href={'/business/create'}>
            {t('regForm.form.getStartedHere')}
          </Link>
        </span>
      </div>
    </>
  );
};

export default SecondaryRegForm;
