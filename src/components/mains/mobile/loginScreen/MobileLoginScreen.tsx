import React, { useContext } from 'react';
import CommonInput from '../../../../common/components/inputs/commonInput/CommonInput';
import clsx from 'clsx';
import styles from '../registerScreen/MobileRegisterPage.module.css';
import SliderDotsContainer from '../registerScreen/sliderDotsContainer/SliderDotsContainer';
import InputWithError from '../../../../common/components/inputs/commonInput/inputWithError/InputWithError';
import PrimaryButtonStateful from '../../../../common/components/buttons/primaryButtonStateful/PrimaryButtonStateful';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ThemeContext from '../../../../common/context/ThemeContext';
import { THEME_TYPE } from '../../../../common/enums/theme';

type Props = {};

const MobileLoginScreen: React.FC<Props> = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const onChange = (e) => {
    console.log(e);
  };

  const onClickRegister = () => router.push('/signup');

  return (
    <div
      onChange={onChange}
      className={clsx(
        styles.regMobilePageContainer,
        'justify-stretch !pt-[76px]'
      )}
    >
      <div
        className={
          'p-[12px] flex gap-[16px] shadow left-0 fixed top-0 w-full z-[10] bg-[white] items-center'
        }
      >
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
        placeholder={'place'}
        labelText={''}
        value={''}
      />
      <InputWithError
        name={'password'}
        type={'password'}
        className="mt-[8px]"
        placeholder={'place'}
        labelText={''}
        value={''}
      />
      <PrimaryButtonStateful
        isActive={true}
        activeText={'Log in'}
        onClick={() => {}}
      />
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
