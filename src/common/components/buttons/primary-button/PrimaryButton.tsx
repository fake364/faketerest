import React, { useContext } from 'react';
import BaseButton, { BaseButtonProps } from '../base/BaseButton';
import ThemeContext from '../../../context/ThemeContext';

const PrimaryButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	...otherProps
}) => {
	return (
		<BaseButton
			className={`${
				className ? className : ''
			} bg-primary hover:bg-primary_hovered text-text_primary rounded-common_radius`}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
};

export default PrimaryButton;
