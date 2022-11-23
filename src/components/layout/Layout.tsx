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
import DesktopHeader from './desktopHeader/DesktopHeader';
import { mobileCheck } from '../../common/utils/mobileCheck/mobileCheck';
import MobileNavigation from './mobileNavigation/MobileNavigation';

export enum HEADER_MODE {
  DEFAULT,
  FAKE_BUILDER,
  NON_AUTHED_WITH_SEARCH
}

type Props = { className?: string };

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <BaseHead />
      {mobileCheck() ? <MobileNavigation /> : <DesktopHeader />}
      <main className={clsx('')}>{children}</main>
    </div>
  );
};

export default Layout;
