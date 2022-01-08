import React, { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { THEME_TYPE } from '../../../enums/theme';

export interface BaseButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const BaseButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	...otherProps
}) => {
	const { theme } = useContext(ThemeContext);

	return (
		<button
			{...otherProps}
			data-theme={theme ? theme : THEME_TYPE.BASE}
			className={`font-bold px-[12px] py-[8px] active:scale-90 active:brightness-15 ${
				className ? className : ''
			}`}
		>
			{children}
		</button>
	);
};

export default BaseButton;
