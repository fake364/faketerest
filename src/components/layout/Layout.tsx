import React from 'react';
import Header from '../header/Header';
import NavigationContainer from '../header/navigation/base-container/NavigationContainer';
import BaseHead from '../head/BaseHead';
import CommonNavigation from '../header/navigation/common-navigation/CommonNavigation';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import AuthNavigation from '../header/navigation/auth-navigation/AuthNavigation';
import FakeBuilderHeader from '../header/navigation/fake-builder-header/FakeBuilderHeader';

export enum HEADER_MODE {
  DEFAULT,
  FAKE_BUILDER,
  NON_AUTHED_WITH_SEARCH
}

type Props = { className?: string };

const Layout: React.FC<Props> = ({ children, className }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  const mode = useSelector((state: RootState) => state.metadata.headerMode);

  return (
    <div className={className}>
      <BaseHead />
      <Header>
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
      <main className={clsx('')}>{children}</main>
    </div>
  );
};

export default Layout;
