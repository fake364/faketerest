import React from 'react';
import COMMON_CONSTANTS from '../../common/constants/commons';
import Head from 'next/head';

type Props = {};

const BaseHead: React.FC<Props> = ({ children }) => (
	<Head>
		<title>{COMMON_CONSTANTS.TITLE}</title>
		<link rel="icon" href="/favicon.ico" />
		{children}
	</Head>
);

export default BaseHead;
