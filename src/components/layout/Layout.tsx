import React from 'react';
import Header from '../header/Header';
import NavigationContainer from '../header/navigation/base-container/NavigationContainer';
import BaseHead from '../head/BaseHead';
import CommonNavigation from '../header/navigation/common-navigation/CommonNavigation';

type Props = { isLogged: boolean };

const Layout: React.FC<Props> = ({ children, isLogged }) => {
	return (
		<>
			<BaseHead />
			<Header>
				<NavigationContainer>
					<CommonNavigation />
				</NavigationContainer>
			</Header>
			<main>{children}</main>
		</>
	);
};

export default Layout;
