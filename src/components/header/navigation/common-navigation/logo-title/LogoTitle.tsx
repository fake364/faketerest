import React from 'react';
import Image from 'next/image';
import logoPic from '../../../../../../public/logo.png';
import COMMON_CONSTANTS from '../../../../../common/constants/commons';

type Props = {};

const LogoTitle: React.FC<Props> = () => {
	return (
		<div className="flex items-center">
			<Image src={logoPic} alt={'Logo'} width={32} height={32} />
			<span className="font-bold text-red-600 text-[20px] ml-[6px] ">
				{COMMON_CONSTANTS.TITLE}
			</span>
		</div>
	);
};

export default LogoTitle;
