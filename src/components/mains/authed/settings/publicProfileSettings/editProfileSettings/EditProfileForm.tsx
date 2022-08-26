import React from 'react';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import { UserData } from '../../../../../../common/types/user-types/UserData';
import ChangeProfilePhoto from './changeProfilePhoto/ChangeProfilePhoto';
import { useFormik } from 'formik';
import SecondaryButton from '../../../../../../common/components/buttons/secondary-button/SecondaryButton';
import clsx from 'clsx';
import { editProfileSchema } from '../../../../../../common/yupSchemas/editProfileData/GetEditProfileSchema';

type Props = { userData: UserData };

const EditProfileForm: React.FC<Props> = ({
  userData: { firstName, username, lastName }
}) => {
  const onSubmit = () => {};

  const formik = useFormik<
    Pick<UserData, 'firstName' | 'lastName' | 'username'>
  >({
    initialValues: {
      firstName,
      lastName,
      username
    },
    validationSchema: editProfileSchema,
    onSubmit: onSubmit
  });
  return (
    <>
      <ChangeProfilePhoto firstName={firstName} />
      <form name="edit-profile-form" onSubmit={formik.handleSubmit}>
        <div className="flex gap-[12px] w-full">
          <InputWithError
            name={'firstName'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={'Имя'}
            value={formik.values.firstName}
            variant={'topLabel'}
          />
          <InputWithError
            name={'lastName'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={'Фамилия'}
            value={formik.values.lastName}
            variant={'topLabel'}
          />
        </div>
        <div>
          <InputWithError
            name={'username'}
            onChange={formik.handleChange}
            type="text"
            className="mt-[8px] flex-1"
            labelText={'Имя пользователя'}
            value={formik.values.username}
            variant={'topLabel'}
          />
          <div className="text-[12px] mt-[8px] ml-[8px] text-[gray]">
            {window.location.host + '/' + formik.values.username}
          </div>
        </div>
      </form>
      <div className="fixed bottom-0 py-[16px] bg-[white] w-full left-0 shadow-[0px_11px_16px_2px_rgb(0_0_0)] flex justify-center gap-[18px]">
        <SecondaryButton
          className={clsx(
            !formik.dirty && '!text-[gray]',
            'py-[16px] px-[24px] font-[400]'
          )}
        >
          Сбросить
        </SecondaryButton>
        <SecondaryButton className={'!text-[gray]'}>Сохранить</SecondaryButton>
      </div>
    </>
  );
};

export default EditProfileForm;
