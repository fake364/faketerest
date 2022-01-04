import React from 'react';

type Props = {};

const NavigationContainer: React.FC<Props> = ({ children }) => {
	return <nav>{children}</nav>;
};

export default NavigationContainer;
