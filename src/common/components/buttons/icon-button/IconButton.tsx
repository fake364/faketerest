import React from 'react';
import BaseButton, { BaseButtonProps } from '../base/BaseButton';
import { IconType } from '@react-icons/all-files';

interface Props extends BaseButtonProps {
	Icon: IconType;
}

const IconButton: React.FC<Props> = ({ Icon, ...rest }) => {
	return (
		<BaseButton {...rest}>
			<Icon />
		</BaseButton>
	);
};

export default IconButton;
