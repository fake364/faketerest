import React from 'react';
import InputWithError from '../../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import { regFormNames } from '../formValues/schemas/GetRegFormSchema';
import PrimaryButton from '../../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import {
  getInitRegFormValues,
  initializeRegSchema
} from '../formValues/schemas/initializeRegSchema';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import { REGISTRATION_ERROR } from '../../../../../../../common/backend/models/constants/code';
import RegFormSpinner from '../spinner/RegFormSpinner';
import { StatusCodes } from 'http-status-codes';
import { setIsLoggedIn } from '../../../../../../../redux/actions/metadata/actions';
import { AppDispatch } from '../../../../../../../redux/types';
import { useDispatch } from 'react-redux';

export const RegInputs: React.FC = () => {
  const { t: commonTranslations } = useTranslation('common');
  const { t } = useTranslation('main-page');
  const { t: errors } = useTranslation('error-messages');
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: getInitRegFormValues(),
    validationSchema: initializeRegSchema(errors),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const response = await axios('/api/registration/create', {
          responseType: 'json',
          method: 'POST',
          data: {
            [regFormNames.password]: sha256(values.password).toString(),
            [regFormNames.age]: values.age,
            [regFormNames.email]: values.email
          }
        });
        if (response.status === StatusCodes.OK) {
          dispatch(setIsLoggedIn(true));
          const header = document.querySelector('header');
          if (header) header.style.visibility = 'visible';
        }
      } catch (e) {
        console.log(e);
        if (e.response.data.errorCode === REGISTRATION_ERROR.email) {
          formik.setFieldError(regFormNames.email, errors('existentEmail'));
        }
      }
    }
  });

  return (
    <>
      {formik.isSubmitting && <RegFormSpinner />}
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <InputWithError
          name={regFormNames.email}
          onChange={formik.handleChange}
          className="mt-[28px]"
          placeholder={commonTranslations('placeholders.email')}
          labelText={formik.errors[regFormNames.email]}
        />
        <InputWithError
          name={regFormNames.password}
          onChange={formik.handleChange}
          type="password"
          className="mt-[8px]"
          placeholder={commonTranslations('placeholders.createPassword')}
          labelText={formik.errors[regFormNames.password]}
        />
        <InputWithError
          name={regFormNames.age}
          onChange={formik.handleChange}
          className="mt-[8px]"
          placeholder={commonTranslations('placeholders.age')}
          labelText={formik.errors[regFormNames.age]}
        />
        <PrimaryButton className="mt-[8px] self-stretch" type="submit">
          {t('regForm.form.buttons.continue')}
        </PrimaryButton>
      </form>
    </>
  );
};
