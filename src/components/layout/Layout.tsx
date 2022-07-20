import React from 'react';
import Header from '../header/Header';
import NavigationContainer from '../header/navigation/base-container/NavigationContainer';
import BaseHead from '../head/BaseHead';
import CommonNavigation from '../header/navigation/common-navigation/CommonNavigation';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import AuthNavigation from '../header/navigation/auth-navigation/AuthNavigation';

type Props = { className?: string };

const Layout: React.FC<Props> = ({ children, className }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );
  return (
    <div className={className}>
      <BaseHead />
      <Header>
        {isLoggedIn ? (
          <AuthNavigation />
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
