import React from 'react';
import Layout from './Layout';

type Props = { className?: string };

const AuthLayout: React.FC<Props> = ({ children, className }) => {
	return (
		<Layout className={className} isLogged={false}>
			{children}
		</Layout>
	);
};

export default AuthLayout;
