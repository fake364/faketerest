import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import SettingsPageWrapper from '../pageWrapper/SettingsPageWrapper';
import InputWithError from '../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import { useFormik } from 'formik';
import UserDataEntity from '../../../../../common/backend/validation-services/registration/UserDataEntity';
import SubmitFooter from '../submitFooter/SubmitFooter';
import { useRouter } from 'next/router';
import { accountSettingsSchema } from '../../../../../common/yupSchemas/accountSettings/accountSettingsSchema';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../redux/types';
import { setUserData } from '../../../../../redux/actions/user-data/actions';
import { getErrorsKeysArray } from '../publicProfileSettings/editProfileSettings/utils/utils';
import { FORM_ERRORS_KEYS } from '../../../../../common/enums/common';

type Props = { userData: UserDataEntity };

type FormType = {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const AccountSettings: React.FC<Props> = ({ userData: { email } }) => {
  const { t } = useTranslation('settings');
  const { t: errors } = useTranslation('error-messages');

  const state = useSelector((state: RootState) => state);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const resetPasswordFields = async () => {
    await formik.setFieldValue('password', '');
    await formik.setFieldValue('currentPassword', '');
    await formik.setFieldValue('confirmPassword', '');
  };

  const resetPasswordIfNeeded = async (
    password: string,
    currentPassword: string
  ) => {
    if (!password || !currentPassword) {
      await resetPasswordFields();
    }
  };

  const onSubmit = async (values: FormType) => {
    const submitData: {
      email: string;
      password?: string;
      currentPassword?: string;
    } = {
      email: values.email
    };
    if (values.password && values.currentPassword) {
      submitData.password = values.password;
      submitData.currentPassword = values.currentPassword;
    }
    try {
      await resetPasswordIfNeeded(values.password, values.currentPassword);
      await axios.patch(
        '/api/registration/' + state.metadata.userId,
        submitData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      dispatch(
        setUserData({ ...state.userData.userData, email: values.email })
      );
      router.reload();
    } catch (e) {
      // TODO refactor this shit
      console.log(e);
      const errorsKeys = getErrorsKeysArray(e);
      errorsKeys.forEach((key) => {
        switch (key) {
          case FORM_ERRORS_KEYS.INVALID_CURRENT_PASSWORD:
            formik.setFieldError(
              'currentPassword',
              errors('currentPasswordIncorrect')
            );
            break;
          case FORM_ERRORS_KEYS.EXISTING_FIELD:
            formik.setFieldError('email', errors('registeredEmail'));
            break;
        }
      });
    }
  };

  const formik = useFormik<FormType>({
    initialValues: {
      email,
      password: '',
      confirmPassword: '',
      currentPassword: ''
    },
    onSubmit,
    validationSchema: accountSettingsSchema
  });

  const onReset = () => {
    formik.resetForm();
  };

  return (
    <SettingsPageWrapper
      title={t('tabs.manage-account')}
      subtitle={t('manage-account.subtitle')}
    >
      <form onSubmit={formik.handleSubmit} className="max-w-[480px]">
        <InputWithError
          name={'email'}
          variant={'topLabel'}
          labelText={t('inputNames.email')}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <InputWithError
          name={'currentPassword'}
          variant={'topLabel'}
          labelText={t('inputNames.currentPassword')}
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          error={formik.errors.currentPassword}
          type={'password'}
        />
        <InputWithError
          name={'password'}
          variant={'topLabel'}
          labelText={t('inputNames.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          type={'password'}
        />
        <InputWithError
          name={'confirmPassword'}
          variant={'topLabel'}
          labelText={t('inputNames.confirmPassword')}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
          type={'password'}
        />
        <SubmitFooter
          wasFormChanged={formik.dirty}
          onReset={onReset}
          isFormValid={formik.isValid}
          isSubmitting={formik.isSubmitting}
        />
      </form>
    </SettingsPageWrapper>
  );
};

export default AccountSettings;
