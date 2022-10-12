import React from 'react';
import LoginBackImages from '../../src/components/mains/others/login/LoginBackImages';
import RegForm from '../../src/components/mains/others/baseMain/regForm/form/RegForm';

export default function Login(props) {
  return (
    <LoginBackImages>
      <div
        className="absolute z-10 flex justify-center items-center left-[0px] right-[0px] top-[0px]
       bottom-[0px] remove-margin"
      >
        <RegForm isRegistrationShown={false} />
      </div>
    </LoginBackImages>
  );
}
