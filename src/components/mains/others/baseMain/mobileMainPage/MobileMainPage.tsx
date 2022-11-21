import React from 'react';
import BackgroundImages from '../../login/BackgroundImages';
import Image from 'next/image';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useRouter } from 'next/router';

type Props = {};

const MobileMainPage: React.FC<Props> = () => {
  const router = useRouter();

  const onClickRegister = async () => {
    await router.push('/signup');
  };

  return (
    <BackgroundImages>
      <div
        className={
          'flex flex-col text-[white] absolute z-10 items-center w-full h-full justify-center gap-[1.5rem]'
        }
      >
        <div className={'w-[15vw] h-[15vw] relative'}>
          <Image
            layout={'fill'}
            objectFit={'contain'}
            src={'/faketerest-white-transparent.png'}
          />
        </div>
        <div className={'text-[2rem] font-medium max-w-[60vw] text-center'}>
          Welcome to Faketerest
        </div>
        <div className={'max-w-[75vw] w-full'}>
          <PrimaryButton
            className={'w-full py-[12px]'}
            onClick={onClickRegister}
          >
            Continue with email
          </PrimaryButton>
        </div>
        <div className={'text-center mt-[12px] mb-[48px]'}>
          Already a member? <span className={'font-medium'}>Log in</span>
        </div>
      </div>
    </BackgroundImages>
  );
};

export default MobileMainPage;
