import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import RegFormSpinner from '../spinner/RegFormSpinner';
import InputWithError from '../../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../../common/components/buttons/primary-button/PrimaryButton';
import useTranslation from 'next-translate/useTranslation';
import {
  getInitLoginFormValues,
  initializeLoginSchema
} from '../formValues/schemas/initializeLoginSchema';
import { loginFormNames } from '../formValues/schemas/GetLoginFormSchema';
import { StatusCodes } from 'http-status-codes';
import { AppDispatch } from '../../../../../../../redux/types';
import { useDispatch } from 'react-redux';
import {
  setIsLoggedIn,
  setUserId
} from '../../../../../../../redux/actions/metadata/actions';
import Router from 'next/router';
import RegistrationRequests from '../../../../../../../common/requests/registration/RegistrationRequests';

type Props = {};

const LoginInputs: React.FC<Props> = () => {
  const { t: commonTranslations } = useTranslation('common');
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('main-page');
  const { t: errors } = useTranslation('error-messages');
  const [error, setError] = useState<string>('');

  const formik = useFormik({
    initialValues: getInitLoginFormValues(),
    validationSchema: initializeLoginSchema(errors),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const response = await RegistrationRequests.loginRequest({
          email: values.email,
          password: values.password
        });
        if (response.status === StatusCodes.OK) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserId(response.data.userId));
          Router.pathname !== '/' && (await Router.push('/'));
          const header = document.querySelector('header');
          if (header) header.style.visibility = 'visible';
        }
      } catch (e) {
        console.error(e);
        if (e?.response?.status === StatusCodes.UNAUTHORIZED) {
          setError(errors('invalidAuth'));
        } else {
          setError(errors('somethingWentWrong'));
        }
      }
    }
  });

  return (
    <>
      {formik.isSubmitting && <RegFormSpinner />}

      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        {error && (
          <label
            id={'error-label'}
            className="text-[#e60023] text-center px-[10px] block text-[14px] mt-[14px] mb-[14px]"
          >
            {error}
          </label>
        )}
        <InputWithError
          name={loginFormNames.email}
          onChange={formik.handleChange}
          className="mt-[14px]"
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
