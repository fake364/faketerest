import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import InputWithError from '../../../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useFormik } from 'formik';
import BaseButton from '../../../../../../common/components/buttons/base/BaseButton';
import IconButton from '../../../../../../common/components/buttons/icon-button/IconButton';
import { IconType } from '@react-icons/all-files';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';

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
          Continue
        </PrimaryButton>
        <div className="mt-[8px] text-[#333333] font-bold">OR</div>
        <BaseButton
          className="mt-[8px] self-stretch bg-[#1877f2] rounded-common_radius py-[8px] text-white"
          onClick={formik.handleSubmit}
        >
          <div className="flex items-center justify-center">
            <FaFacebook className="mr-[8px] text-[24px]" />
            <div>Continue with facebook</div>
          </div>
        </BaseButton>
      </div>
    </div>
  );
};

export default RegForm;
