import React from 'react';
import BaseButton, { BaseButtonProps } from '../base/BaseButton';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';

const PrimaryButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	...otherProps
}) => {
	const {
		theme: { PRIMARY, TEXT_PRIMARY }
	} = useContext(ThemeContext);
	console.log(PRIMARY);
	return (
		<BaseButton
			style={{ backgroundColor: PRIMARY, color: TEXT_PRIMARY }}
			className={className}
			{...otherProps}
		>
			{children}
		</BaseButton>
	);
};

export default PrimaryButton;
