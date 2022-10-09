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
import { handleFieldError } from '../../../../../common/backend/utils/registrationUtils/errorHandlers';

type Props = { userData: UserDataEntity };

type FormType = {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const AccountSettings: React.FC<Props> = ({ userData: { email } }) => {
  const { t } = useTranslation('settings');
  const state = useSelector((state: RootState) => state);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const resetPasswordFields = async () => {
    await formik.setFieldValue('password', '');
    await formik.setFieldValue('currentPassword', '');
    await formik.setFieldValue('confirmPassword', '');
  };

  const checkCurrentPassword = async (currentPassword: string) => {
    try {
      await axios.post('/login', {
        email: state.userData.userData.email,
        password: currentPassword
      });
    } catch (e) {
      formik.setFieldError(
        'currentPassword',
        'You have entered incorrect password'
      );
      throw new Error('Current password is not valid');
    }
  };

  const checkOrResetPasswords = async (
    password: string,
    currentPassword: string
  ) => {
    if (password && currentPassword) {
      await checkCurrentPassword(currentPassword);
    } else {
      await resetPasswordFields();
    }
  };

  const onSubmit = async (values: FormType) => {
    const submitData: { email: string; password?: string } = {
      email: values.email
    };
    if (values.password) {
      submitData.password = values.password;
    }
    try {
      await checkOrResetPasswords(values.password, values.currentPassword);
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
      handleFieldError(e, (fieldName) => {
        fieldName === 'email' &&
          formik.setFieldError(fieldName, 'This email is already registered');
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
          labelText={'Email'}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <InputWithError
          name={'currentPassword'}
          variant={'topLabel'}
          labelText={'Current password'}
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          error={formik.errors.currentPassword}
          type={'password'}
        />
        <InputWithError
          name={'password'}
          variant={'topLabel'}
          labelText={'Password'}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          type={'password'}
        />
        <InputWithError
          name={'confirmPassword'}
          variant={'topLabel'}
          labelText={'Confirm password'}
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
