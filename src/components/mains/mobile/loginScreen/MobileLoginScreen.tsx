import React, { useContext, useState } from 'react';
import CommonInput from '../../../../common/components/inputs/commonInput/CommonInput';
import clsx from 'clsx';
import styles from '../registerScreen/MobileRegisterPage.module.css';
import SliderDotsContainer from '../registerScreen/sliderDotsContainer/SliderDotsContainer';
import InputWithError from '../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButtonStateful from '../../../../common/components/buttons/primaryButtonStateful/PrimaryButtonStateful';
import registerStyles from './MobileLoginScreen.module.css';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import ThemeContext from '../../../../common/context/ThemeContext';
import { THEME_TYPE } from '../../../../common/enums/theme';
import RegistrationRequests from '../../../../common/requests/registration/RegistrationRequests';
import { StatusCodes } from 'http-status-codes';
import {
  setIsLoggedIn,
  setUserId
} from '../../../../redux/actions/metadata/actions';
import { AppDispatch } from '../../../../redux/types';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import CommonUtils from 'faketerest-utilities/dist/common/utils';
import PrimaryButton from '../../../../common/components/buttons/primary-button/PrimaryButton';

type Props = {};

const MobileLoginScreen: React.FC<Props> = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { t: errors } = useTranslation('error-messages');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const onChange = (e) => {
    console.log(e);
  };

  const onClickRegister = () => router.push('/signup');

  const validateFields = () => {
    const validationErrors = {
      emailError: undefined,
      passwordError: undefined
    };
    if (!email.trim()) {
      validationErrors.emailError = errors('requiredEmail');
    } else if (!CommonUtils.validateEmail(email)) {
      validationErrors.emailError = errors('emailFormat');
    }

    if (!password.trim()) {
      validationErrors.passwordError = errors('mandatoryField');
    } else if (password.length < 4) {
      validationErrors.passwordError = errors('shortPassword');
    }
    return validationErrors;
  };

  const onSuccess = async (userId: number) => {
    dispatch(setIsLoggedIn(true));
    dispatch(setUserId(userId));
    Router.pathname !== '/' && (await Router.push('/'));
  };

  const onLoginError = (e) => {
    if (e?.response?.status === StatusCodes.UNAUTHORIZED) {
      setEmailError(errors('invalidAuth'));
    } else {
      setEmailError(errors('somethingWentWrong'));
    }
  };

  const onClickLogin = async () => {
    const validationObj = validateFields();
    if (!validationObj.emailError && !validationObj.passwordError) {
      try {
        const response = await RegistrationRequests.loginRequest({
          email,
          password
        });
        if (response.status === StatusCodes.OK) {
          await onSuccess(response.data.userId);
        }
      } catch (e) {
        onLoginError(e);
      }
    } else {
      if (validationObj.emailError) {
        setEmailError(validationObj.emailError);
      }
      if (validationObj.passwordError) {
        setPasswordError(validationObj.passwordError);
      }
    }
  };

  return (
    <div
      onChange={onChange}
      className={clsx(
        styles.regMobilePageContainer,
        'justify-stretch !pt-[76px]'
      )}
    >
      <div className={registerStyles.loginPageContainer}>
        <div className={'w-[8vw] h-[8vw] relative'}>
          <Image layout={'fill'} objectFit={'contain'} src={'/logo.png'} />
        </div>
        <div
          data-theme={theme ? theme : THEME_TYPE.BASE}
          className={'text-primary text-[20px] font-bold'}
        >
          Faketerest
        </div>
      </div>
      <InputWithError
        name={'email'}
        className="mt-[8px]"
        placeholder={'Email'}
        labelText={emailError}
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <InputWithError
        name={'password'}
        type={'password'}
        className="mt-[8px]"
        placeholder={'Password'}
        labelText={passwordError}
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <PrimaryButton onClick={onClickLogin}>Log in</PrimaryButton>
      <div className={'text-center mt-[24px] text-[18px]'}>
        No account?{' '}
        <span onClick={onClickRegister} className={'font-medium'}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default MobileLoginScreen;
