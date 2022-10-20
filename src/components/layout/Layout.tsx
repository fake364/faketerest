import React from 'react';
import Header from '../header/Header';
import NavigationContainer from '../header/navigation/base-container/NavigationContainer';
import BaseHead from '../head/BaseHead';
import CommonNavigation from '../header/navigation/common-navigation/CommonNavigation';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import AuthNavigation from '../header/navigation/auth-navigation/AuthNavigation';

export enum HEADER_MODE {
  DEFAULT,
  FAKE_BUILDER
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
            {mode === HEADER_MODE.FAKE_BUILDER && (
              <nav className="sticky py-[18px] px-[12px] flex flex-stretch gap-[14px] z-[10]"></nav>
            )}
          </>
        ) : (
          <NavigationContainer>
            <CommonNavigation />
          </NavigationContainer>
        )}
      </Header>
      <main className={clsx('h-full')}>{children}</main>
    </div>
  );
};

export default Layout;
