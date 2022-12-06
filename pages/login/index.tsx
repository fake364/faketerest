import React, { useEffect } from 'react';
import BackgroundImages from '../../src/components/mains/others/login/BackgroundImages';
import RegForm from '../../src/components/mains/others/baseMain/regForm/form/RegForm';
import { mobileCheck } from '../../src/common/utils/mobileCheck/mobileCheck';
import MobileLoginScreen from '../../src/components/mains/mobile/loginScreen/MobileLoginScreen';
import useOnlyNotAuthPage from '../../src/common/hooks/useOnlyNotAuthPage/useOnlyNotAuthPage';

export default function Login(props) {
  const isMobile = mobileCheck();
  useOnlyNotAuthPage();

  if (isMobile) {
    return <MobileLoginScreen />;
  }

  return (
    <BackgroundImages>
      <div
        className="absolute z-10 flex justify-center items-center left-[0px] right-[0px] top-[0px]
       bottom-[0px] remove-margin"
      >
        <RegForm isRegistrationShown={false} />
      </div>
    </BackgroundImages>
  );
}
