import React, { useEffect, useState } from 'react';
import CommonInput from '../../../../common/components/inputs/commonInput/CommonInput';
import SecondaryButton from '../../../../common/components/buttons/secondary-button/SecondaryButton';
import CircleIconButton from '../../../../common/components/buttons/CircleIconButton';
import { BiChevronLeft } from '@react-icons/all-files/bi/BiChevronLeft';
import SliderDots from './sliderDots/SliderDots';
import styles from './MobileRegisterPage.module.css';
import clsx from 'clsx';
import { useFormik } from 'formik';
import RegistrationRequests, {
  CreateRegistrationPayload
} from '../../../../common/requests/registration/RegistrationRequests';
import getRegFormSchema, {
  regFormNames
} from '../../others/baseMain/regForm/form/formValues/schemas/GetRegFormSchema';
import useTranslation from 'next-translate/useTranslation';
import {
  getInitRegFormValues,
  initializeRegSchema
} from '../../others/baseMain/regForm/form/formValues/schemas/initializeRegSchema';
import InputWithError from '../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButton from '../../../../common/components/buttons/primary-button/PrimaryButton';
import { StatusCodes } from 'http-status-codes';
import {
  setIsLoggedIn,
  setUserId
} from '../../../../redux/actions/metadata/actions';
import { AppDispatch, RootState } from '../../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SliderDotsContainer from './sliderDotsContainer/SliderDotsContainer';
import PrimaryButtonStateful from '../../../../common/components/buttons/primaryButtonStateful/PrimaryButtonStateful';

type Props = {};

const stepIndexToFieldName = ['email', 'password', 'age'];

const MobileRegisterPage: React.FC<Props> = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const { t: errors } = useTranslation('error-messages');
  const { t } = useTranslation('common');
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (value: CreateRegistrationPayload) => {
    const response = await RegistrationRequests.createRegistration(value);
    if (response.status === StatusCodes.OK) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUserId(response.data.userId));
    }
  };

  const formik = useFormik<CreateRegistrationPayload>({
    onSubmit,
    validationSchema: initializeRegSchema(errors),
    initialValues: getInitRegFormValues(),
    validateOnMount: true,
    initialTouched: { age: false, email: false, password: false }
  });

  const onBack = () => {
    if (stepIndex === 0) {
      router.back();
      return;
    }
    setStepIndex((prevState) => prevState - 1);
  };

  const titlesArray = [
    t('whatYourEmail'),
    t('createAPassword'),
    t('specifyAge')
  ];

  const placeholders = [
    t('mobileRegistrationPlaceholders.email'),
    t('mobileRegistrationPlaceholders.password'),
    t('mobileRegistrationPlaceholders.age')
  ];

  const fieldName = stepIndexToFieldName[stepIndex];
  const fieldValue = formik.values[fieldName];
  const fieldTouched = formik.touched[fieldName];
  const currentError = fieldTouched && formik.errors[fieldName];
  const inputType = stepIndex === 1 ? 'password' : '';
  const buttonType = stepIndex === 3 ? 'submit' : 'button';


  const onChangeStep = async () => {
    if (
      fieldName === 'email' &&
      (await RegistrationRequests.isEmailExists(fieldValue))
    ) {
      formik.setFieldError(fieldName, 'This email already exists');
      return;
    }
    const error = await formik.validateField(fieldName);
    if (!error && stepIndex !== 2) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const onChangeInput = (e) => {
    formik.setFieldTouched(e.target.name);
    formik.handleChange(e);
  };

  const onClickLogin = () => router.push('/login');


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={clsx(styles.regMobilePageContainer, 'justify-stretch')}>
        <SliderDotsContainer activeDotNumber={stepIndex} onBack={onBack} />
        <div className={'text-[2rem] font-medium mb-[16px] ml-[12px]'}>
          {titlesArray[stepIndex]}
        </div>
        <InputWithError
          name={fieldName}
          onChange={onChangeInput}
          type={inputType}
          className="mt-[8px]"
          placeholder={placeholders[stepIndex]}
          labelText={currentError}
          value={fieldValue || ''}
        />
        <PrimaryButtonStateful
          isActive={!currentError}
          activeText={t('next')}
          type={buttonType}
          onClick={onChangeStep}
        />
        <div className={'text-center mt-[24px] text-[18px]'}>
          {t('alreadyAMember')}
          <span onClick={onClickLogin} className={'font-medium'}>
            {t('logIn')}
          </span>
        </div>
      </div>
    </form>
  );
};

export default MobileRegisterPage;
