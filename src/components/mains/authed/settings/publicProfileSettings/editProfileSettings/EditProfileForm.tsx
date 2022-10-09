import React, { ChangeEventHandler } from 'react';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import ChangeProfilePhoto from './changeProfilePhoto/ChangeProfilePhoto';
import { useFormik } from 'formik';
import { editProfileSchema } from '../../../../../../common/yupSchemas/editProfileData/GetEditProfileSchema';
import SubmitFooter from '../../submitFooter/SubmitFooter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../redux/types';
import { useRouter } from 'next/router';
import { setUserData } from '../../../../../../redux/actions/user-data/actions';
import useTranslation from 'next-translate/useTranslation';
import { MB_3_IN_BYTES } from '../../../../../../common/constants/commons';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import { submitProfileSettings } from './utils/utils';
import { handleFieldError } from '../../../../../../common/backend/utils/registrationUtils/errorHandlers';

type Props = { userData: UserDataEntity };

export type PublicSettingsFormData = Pick<
  UserDataEntity,
  'firstName' | 'lastName' | 'username'
> & {
  image?: File;
};

const EditProfileForm: React.FC<Props> = ({
  userData: { firstName, username, lastName }
}) => {
  const state = useSelector((state: RootState) => state);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('settings');

  const onSubmit = async (values: PublicSettingsFormData) => {
    try {
      await submitProfileSettings(state.metadata.userId, values);
      dispatch(setUserData({ ...state.userData?.userData, ...values }));
      router.reload();
    } catch (e) {
      handleFieldError(e, (fieldName) => {
        fieldName === 'username' &&
          formik.setFieldError(fieldName, 'This username already exists');
      });
    }
  };

  const formik = useFormik<PublicSettingsFormData>({
    initialValues: {
      firstName,
      lastName: lastName || '',
      username
    },
    validationSchema: editProfileSchema,
    onSubmit: onSubmit,
    validateOnChange: true,
    enableReinitialize: true
  });

  const onReset = () => {
    formik.resetForm();
  };

  const onChangeFiles: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];
    if (file.size < MB_3_IN_BYTES) {
      formik.setFieldValue('image', file);
      formik.setFieldError('image', undefined);
    } else {
      formik.setFieldError('image', t('errors.maximumImage'));
    }
  };

  return (
    <>
      <ChangeProfilePhoto firstName={firstName} onChangeFile={onChangeFiles} />
      <form name="edit-profile-form" onSubmit={formik.handleSubmit}>
        <div className="flex gap-[12px] w-full">
          <InputWithError
            name={'firstName'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={t('inputNames.firstName')}
            value={formik.values.firstName}
            variant={'topLabel'}
            error={formik.errors.firstName}
          />
          <InputWithError
            name={'lastName'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={t('inputNames.lastName')}
            value={formik.values.lastName}
            variant={'topLabel'}
            error={formik.errors.lastName}
          />
        </div>
        <div>
          <InputWithError
            name={'username'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={t('inputNames.username')}
            value={formik.values.username}
            variant={'topLabel'}
            error={formik.errors.username}
          />
          <div className="text-[12px] mt-[8px] ml-[8px] text-[gray]">
            {window.location.host + '/' + formik.values.username}
          </div>
        </div>

        <SubmitFooter
          wasFormChanged={formik.dirty}
          onReset={onReset}
          isFormValid={formik.isValid}
          isSubmitting={formik.isSubmitting}
        />
      </form>
    </>
  );
};

export default EditProfileForm;
