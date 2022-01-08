import React from 'react';
import BaseButton, { BaseButtonProps } from '../base/BaseButton';

const SecondaryButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	...otherProps
}) => {
	return (
		<BaseButton
			className={`${
				className ? className : ''
			} bg-secondary hover:bg-secondary_hovered text-text_secondary rounded-common_radius`}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
};

export default SecondaryButton;
