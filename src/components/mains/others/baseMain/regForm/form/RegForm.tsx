import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useFormik } from 'formik';

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
    <div className="p-[8px] bg-white flex w-[483px] min-w-[483px] items-center flex-col ml-[56px] rounded-form_radius">
      <div className="my-[16px]">
        <Image src={'/logo.png'} width={40} height={40} />
      </div>
      <div className="text-[36px] text-[#333333] font-semibold">
        {t('regForm.form.title')}
      </div>
      <div className="text-[16px] text-[#333333] mt-[8px]">
        {t('regForm.form.subtitle')}
      </div>
      <div className="flex flex-col">
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
        <PrimaryButton className="mt-[8px]" onClick={formik.handleSubmit}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
};

export default RegForm;
