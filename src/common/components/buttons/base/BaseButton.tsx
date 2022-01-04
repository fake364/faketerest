import React from 'react';
import styles from 'button.module.scss';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const BaseButton: React.FC<Props> = ({ children, className, ...otherProps }) => {
	return (
		<button {...otherProps} className={`${styles.button} ${className ? className : ''}`}>
			{children}
		</button>
	);
};
