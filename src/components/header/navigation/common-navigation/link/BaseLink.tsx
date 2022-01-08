import React from 'react';
import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
	className?: string;
}

const BaseLink: React.FC<Props> = ({ children, className, ...rest }) => {
	return (
		<Link {...rest}>
			<span
				className={`${
					className ? className : ''
				} text-black cursor-pointer hover:underline font-medium`}
			>
				{children}
			</span>
		</Link>
	);
};

export default BaseLink;
