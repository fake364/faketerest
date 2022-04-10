import React from 'react';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';
import { useTranslation } from 'next-i18next';

type Props = {};

const LoginButtons: React.FC<Props> = () => {
	const { t } = useTranslation('main-page');
	return (
		<>
			<PrimaryButton className="mr-[8px]">
				{t('loginButtons.login')}
			</PrimaryButton>
			<SecondaryButton>{t('loginButtons.register')}</SecondaryButton>
		</>
	);
};

export default LoginButtons;
