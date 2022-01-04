import React from 'React';
import Image from 'next/image';
import logoPic from '../../../../../public/logo.png';
import COMMON_CONSTANTS from '../../../../common/constants/commons';

type Props = {};

const LogoTitle: React.FC<Props> = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Image src={logoPic} alt={'Logo'} width={32} height={32} />
			<span className="underline bold">{COMMON_CONSTANTS.TITLE}</span>
		</div>
	);
};

export default LogoTitle;
