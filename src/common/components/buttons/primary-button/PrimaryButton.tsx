import React from 'react';
import BaseButton, { BaseButtonProps } from '../base/BaseButton';

const PrimaryButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	...otherProps
}) => {
	return (
		<BaseButton
			className={`${
				className ? className : ''
			} bg-primary px-[12px] py-[8px] hover:bg-primary_hovered text-text_primary rounded-common_radius`}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
};

export default PrimaryButton;
