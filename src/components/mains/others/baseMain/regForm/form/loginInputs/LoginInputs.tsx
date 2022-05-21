import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import RegFormSpinner from '../spinner/RegFormSpinner';
import InputWithError from '../../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useTranslation } from 'next-i18next';
import {
  getInitLoginFormValues,
  initializeLoginSchema
} from '../formValues/schemas/initializeLoginSchema';
import { loginFormNames } from '../formValues/schemas/GetLoginFormSchema';

type Props = {};

const LoginInputs: React.FC<Props> = () => {
  const { t: commonTranslations } = useTranslation('common');

  const { t } = useTranslation('main-page');
  const { t: errors } = useTranslation('error-messages');

  const formik = useFormik({
    initialValues: getInitLoginFormValues(),
    validationSchema: initializeLoginSchema(errors),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios('/api/login', {
          responseType: 'json',
          method: 'POST',
          data: {
            [loginFormNames.password]: sha256(values.password).toString(),
            [loginFormNames.email]: values.email
          }
        });
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
  });

  return (
    <>
      {formik.isSubmitting && <RegFormSpinner />}
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <InputWithError
          name={loginFormNames.email}
          onChange={formik.handleChange}
          className="mt-[28px]"
          placeholder={commonTranslations('placeholders.email')}
          labelText={formik.errors[loginFormNames.email]}
        />
        <InputWithError
          name={loginFormNames.password}
          onChange={formik.handleChange}
          type="password"
          className="mt-[8px]"
          placeholder={commonTranslations('placeholders.password')}
          labelText={formik.errors[loginFormNames.password]}
        />
        <PrimaryButton className="mt-[8px] self-stretch" type="submit">
          {t('regForm.form.buttons.continue')}
        </PrimaryButton>
      </form>
    </>
  );
};

export default LoginInputs;
