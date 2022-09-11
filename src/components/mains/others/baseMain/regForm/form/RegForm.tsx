import React, { Dispatch, SetStateAction } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import IconTextButton from './iconTextButton/IconTextButtom';
import SecondaryRegForm from './secondaryRegForm/SecondaryRegForm';
import RegFormHeader from './header/RegFormHeader';
import { RegInputs } from './regInputs/RegInputs';
import LoginInputs from './loginInputs/LoginInputs';

type Props = {
  isRegistrationShown: boolean;
  setRegistrationShown?: Dispatch<SetStateAction<boolean>>;
};

const RegForm: React.FC<Props> = ({
  setRegistrationShown,
  isRegistrationShown
}) => {
  const { t } = useTranslation('main-page');

  const onTriggerFormMode = () => {
    setRegistrationShown && setRegistrationShown(!isRegistrationShown);
  };

  return (
    <div
      className="bg-white flex w-[483px] min-w-[483px]
     items-center flex-col ml-[56px] rounded-form_radius overflow-hidden
     shadow-[rgb(0_0_0/45%)_0px_2px_10px] relative"
    >
      <RegFormHeader />
      <div className="flex flex-col w-[60%]">
        {isRegistrationShown ? <RegInputs /> : <LoginInputs />}

        <div className="mt-[8px] text-[#333333] font-bold text-center">
          {t('regForm.form.buttons.or')}
        </div>
        <IconTextButton
          Icon={FaFacebook}
          text={t('regForm.form.buttons.continueWithFacebook')}
          onClick={null}
          className="bg-[#1877f2] text-white"
        />
        <IconTextButton
          Icon={FcGoogle}
          text={t('regForm.form.buttons.continueWithGoogle')}
          onClick={null}
          className="text-[#3c4043] border-[1px] border-[#dadce0] text-[15px] font-[500] mt-[12px]"
        />
        <SecondaryRegForm
          isRegistrationForm={isRegistrationShown}
          onTriggerFormMode={setRegistrationShown ? onTriggerFormMode : null}
        />
      </div>
      {setRegistrationShown && (
        <div
          className="bg-[#efefef] w-full h-full text-center text-[16px]
       font-semibold py-[16px] mt-[16px] cursor-pointer"
        >
          {t('regForm.form.createBusinessAccount')}
        </div>
      )}
    </div>
  );
};

export default RegForm;
