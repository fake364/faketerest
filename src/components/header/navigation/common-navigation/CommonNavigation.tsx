import React from 'React';
import LogoTitle from './logo-title/LogoTitle';
import LoginButtonsContainer from './login-buttons/LoginButtonsContainer';

type Props = {};

const CommonNavigation: React.FC<Props> = () => {
	return (
		<>
			<LogoTitle />
			<LoginButtonsContainer />
		</>
	);
};

export default CommonNavigation;
