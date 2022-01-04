import React from 'react';
import Layout from './Layout';

type Props = {};

const AuthLayout: React.FC<Props> = ({ children }) => {
	return <Layout isLogged={false}>{children}</Layout>;
};

export default AuthLayout;
