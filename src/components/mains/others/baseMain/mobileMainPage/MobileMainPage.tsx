import React from 'react';
import BackgroundImages from '../../login/BackgroundImages';
import Image from 'next/image';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const MobileMainPage: React.FC<Props> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const onClickRegister = async () => {
    await router.push('/signup');
  };

  const onClickLogin = async () => {
    await router.push('/login');
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
          {t('welcomeToFaketerest')}
        </div>
        <div className={'max-w-[75vw] w-full'}>
          <PrimaryButton
            className={'w-full py-[12px]'}
            onClick={onClickRegister}
          >
            {t('continueWithEmail')}
          </PrimaryButton>
        </div>
        <div className={'text-center mt-[12px] mb-[48px]'}>
          {t('alreadyAMember')}
          <span onClick={onClickLogin} className={'font-medium'}>
            {t('logIn')}
          </span>
        </div>
      </div>
    </BackgroundImages>
  );
};

export default MobileMainPage;
