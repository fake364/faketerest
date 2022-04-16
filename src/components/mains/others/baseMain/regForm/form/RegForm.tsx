import React from 'react';
import { useTranslation } from 'next-i18next';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useFormik } from 'formik';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import IconTextButton from './iconTextButton/IconTextButtom';
import SecondaryRegForm from './secondaryRegForm/SecondaryRegForm';
import RegFormHeader from './header/RegFormHeader';
import getRegFormSchema, { regFormNames } from './schemas/GetRegFormSchema';

type Props = {};

const RegForm: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');
  const { t: errors } = useTranslation('error-messages');
  const formik = useFormik({
    initialValues: {
      [regFormNames.email]: '',
      [regFormNames.password]: '',
      [regFormNames.age]: ''
    },
    validationSchema: getRegFormSchema({
      tooOld: errors('tooOld'),
      tooLittle: errors('negativeAge'),
      mandatoryField: errors('mandatoryField'),
      longPassword: errors('longPassword'),
      shortPassword: errors('shortPassword'),
      emailFormat: errors('emailFormat'),
      emailRequired: errors('requiredEmail'),
      ageNotNumber: errors('ageNotNumber')
    }),
    onSubmit: () => {}
  });

  console.log(formik);

  const isSubmitted = formik.submitCount !== 0;

  const emailError = (isSubmitted && formik.errors[regFormNames.email]) || '';
  const passwordError =
    (isSubmitted && formik.errors[regFormNames.password]) || '';

  const ageError = (isSubmitted && formik.errors[regFormNames.age]) || '';

  return (
    <div
      className="bg-white flex w-[483px] min-w-[483px]
     items-center flex-col ml-[56px] rounded-form_radius overflow-hidden
     shadow-[rgb(0_0_0/45%)_0px_2px_10px]"
    >
      <RegFormHeader />
      <div className="flex flex-col w-[60%]">
        <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
          <InputWithError
            name={regFormNames.email}
            onChange={formik.handleChange}
            className="mt-[28px]"
            placeholder="Email"
            labelText={emailError}
          />
          <InputWithError
            name={regFormNames.password}
            onChange={formik.handleChange}
            type="password"
            className="mt-[8px]"
            placeholder="Create a password"
            labelText={passwordError}
          />
          <InputWithError
            name={regFormNames.age}
            onChange={formik.handleChange}
            className="mt-[8px]"
            placeholder="Age"
            labelText={ageError}
          />
          <PrimaryButton className="mt-[8px] self-stretch" type="submit">
            {t('regForm.form.buttons.continue')}
          </PrimaryButton>
        </form>
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
        <SecondaryRegForm />
      </div>
      <div
        className="bg-[#efefef] w-full h-full text-center text-[16px]
       font-semibold py-[16px] mt-[16px] cursor-pointer"
      >
        {t('regForm.form.createBusinessAccount')}
      </div>
    </div>
  );
};

export default RegForm;
