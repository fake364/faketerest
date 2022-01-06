import React, { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';

export interface BaseButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

const BaseButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	style,
	...otherProps
}) => {
	const {
		theme: { BUTTON_RADIUS }
	} = useContext(ThemeContext);

	return (
		<button
			{...otherProps}
			style={{ ...style, borderRadius: BUTTON_RADIUS }}
			className={`font-bold px-[12px] py-[8px] active:scale-90 active:brightness-15 ${
				className ? className : ''
			}`}
		>
			{children}
		</button>
	);
};

export default BaseButton;
