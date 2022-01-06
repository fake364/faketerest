import React from 'react';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';

type Props = {};

const LoginButtons: React.FC<Props> = () => {
	return (
		<div>
			<PrimaryButton className="mr-[8px]">Login</PrimaryButton>
			<PrimaryButton>Register</PrimaryButton>
		</div>
	);
};

export default LoginButtons;
