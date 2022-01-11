import React, { useContext } from 'react';
import Image from 'next/image';
import logoPic from '../../../../../../public/logo.png';
import COMMON_CONSTANTS from '../../../../../common/constants/commons';
import ThemeContext from '../../../../../common/context/ThemeContext';

type Props = {};

const LogoTitle: React.FC<Props> = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="flex items-center">
			<Image src={logoPic} alt={'Logo'} width={32} height={32} />
			<span
				data-theme={theme}
				className="font-bold text-primary text-[20px] ml-[6px]"
			>
				{COMMON_CONSTANTS.TITLE}
			</span>
		</div>
	);
};

export default LogoTitle;
