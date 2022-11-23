import React from 'react';
import clsx from 'clsx';
import AuthNavigation from '../../header/navigation/auth-navigation/AuthNavigation';
import FakeBuilderHeader from '../../header/navigation/fake-builder-header/FakeBuilderHeader';
import NavigationContainer from '../../header/navigation/base-container/NavigationContainer';
import CommonNavigation from '../../header/navigation/common-navigation/CommonNavigation';
import Header from '../../header/Header';
import { HEADER_MODE } from '../Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';

type Props = {};

const DesktopHeader: React.FC<Props> = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const mode = useSelector((state: RootState) => state.metadata.headerMode);
  return (
    <Header
      className={clsx(
        isLoggedIn &&
          mode === HEADER_MODE.DEFAULT &&
          'sticky top-0 z-[100] bg-[white]'
      )}
    >
      {isLoggedIn ? (
        <>
          {mode === HEADER_MODE.DEFAULT && <AuthNavigation />}
          {mode === HEADER_MODE.FAKE_BUILDER && <FakeBuilderHeader />}
          {mode === HEADER_MODE.NON_AUTHED_WITH_SEARCH && <div></div>}
        </>
      ) : (
        <NavigationContainer>
          <CommonNavigation />
        </NavigationContainer>
      )}
    </Header>
  );
};

export default DesktopHeader;
