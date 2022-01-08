import React from 'react';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';

type Props = {};

const LoginButtons: React.FC<Props> = () => {
	return (
		<>
			<PrimaryButton className="mr-[8px] ">Login</PrimaryButton>
			<SecondaryButton>Register</SecondaryButton>
		</>
	);
};

export default LoginButtons;
