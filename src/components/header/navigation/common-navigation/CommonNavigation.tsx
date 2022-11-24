import React, { useContext } from 'react';
import LogoTitle from './logo-title/LogoTitle';
import LoginButtonsContainer from './login-buttons/LoginButtonsContainer';
import ThemeContext from '../../../../common/context/ThemeContext';
import { THEME_TYPE } from '../../../../common/enums/theme';
import BaseNavigationLinks from './links-row/BaseNavigationLinks';

type Props = {};

const CommonNavigation: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <LogoTitle />
      <LoginButtonsContainer>
        {/*{theme === THEME_TYPE.BASE && <BaseNavigationLinks />} COMMENTED THIS BECAUSE THERE's no functionality*/}
      </LoginButtonsContainer>
    </>
  );
};

export default CommonNavigation;
