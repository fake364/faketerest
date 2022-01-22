import React from 'react';
import Header from '../header/Header';
import NavigationContainer from '../header/navigation/base-container/NavigationContainer';
import BaseHead from '../head/BaseHead';
import CommonNavigation from '../header/navigation/common-navigation/CommonNavigation';
import clsx from 'clsx';

type Props = { isLogged: boolean; className?: string };

const Layout: React.FC<Props> = ({ children, isLogged, className }) => {
	return (
		<div className={className}>
			<BaseHead />
			<Header>
				<NavigationContainer>
					<CommonNavigation />
				</NavigationContainer>
			</Header>
			<main className={clsx('h-full')}>{children}</main>
		</div>
	);
};

export default Layout;
