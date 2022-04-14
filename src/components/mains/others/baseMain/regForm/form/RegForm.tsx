import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useFormik } from 'formik';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import IconTextButton from './iconTextButton/IconTextButtom';
import Link, { LinkProps } from 'next/link';

type Props = {};

const RegForm: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      age: ''
    },
    onSubmit: () => {}
  });

  console.log(formik);

  return (
    <div
      className="bg-white flex w-[483px] min-w-[483px]
     items-center flex-col ml-[56px] rounded-form_radius overflow-hidden
     shadow-[rgb(0_0_0/45%)_0px_2px_10px]"
    >
      <div className="my-[16px]">
        <Image src={'/logo.png'} width={40} height={40} />
      </div>
      <div className="text-[36px] text-[#333333] font-semibold">
        {t('regForm.form.title')}
      </div>
      <div className="text-[16px] text-[#333333] mt-[8px]">
        {t('regForm.form.subtitle')}
      </div>
      <div className="flex flex-col w-[60%]">
        <InputWithError
          name="email"
          onChange={formik.handleChange}
          className="mt-[28px]"
          placeholder="Email"
        />
        <InputWithError
          name="password"
          onChange={formik.handleChange}
          type="password"
          className="mt-[8px]"
          placeholder="Create a password"
        />
        <InputWithError
          name="age"
          onChange={formik.handleChange}
          className="mt-[8px]"
          placeholder="Age"
        />
        <PrimaryButton
          className="mt-[8px] self-stretch"
          onClick={formik.handleSubmit}
        >
          {t('regForm.form.buttons.continue')}
        </PrimaryButton>
        <div className="mt-[8px] text-[#333333] font-bold text-center">
          {t('regForm.form.buttons.or')}
        </div>
        <IconTextButton
          Icon={FaFacebook}
          text={t('regForm.form.buttons.continueWithFacebook')}
          onClick={() => {}}
          className="bg-[#1877f2] text-white"
        />
        <IconTextButton
          Icon={FcGoogle}
          text={t('regForm.form.buttons.continueWithGoogle')}
          onClick={() => {}}
          className="text-[#3c4043] border-[1px] border-[#dadce0] text-[15px] font-[500] mt-[12px]"
        />
        <div className="mt-[14px] text-center text-[12px] text-gray-600">
          {t('regForm.form.terms.youAgreeWith')}{' '}
          <span className="font-bold whitespace-nowrap">
            <Link href={'/tos'}>{t('regForm.form.terms.termsOfService')}</Link>
          </span>{' '}
          {t('regForm.form.terms.youVeRead')}{' '}
          <span className="font-bold whitespace-nowrap">
            <Link href={'/privacy'}>
              {t('regForm.form.terms.privacyPolicy')}
            </Link>
          </span>
        </div>
        <div className="mt-[12px] text-[13px] text-center text-gray-600 cursor-pointer font-semibold">
          {t('regForm.form.logInLink')}
        </div>
        <div className=" mt-[10px] text-[13px] text-center text-gray-600 font-semibold">
          {t('regForm.form.areYouABusiness')}{' '}
          <span>
            <Link href={'/business/create'}>
              {t('regForm.form.getStartedHere')}
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-[#efefef] w-full h-full text-center text-[16px] font-semibold py-[16px] mt-[16px] cursor-pointer">
        {t('regForm.form.createBusinessAccount')}
      </div>
    </div>
  );
};

export default RegForm;
