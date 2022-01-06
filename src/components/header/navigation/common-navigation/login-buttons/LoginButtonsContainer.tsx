import React from 'react';
import LoginButtons from './LoginButtons';

type Props = { className?: string };

const LoginButtonsContainer: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={className}>
			{children}
			<LoginButtons />
		</div>
	);
};

export default LoginButtonsContainer;
