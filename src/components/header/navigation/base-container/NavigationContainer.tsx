import React from 'react';

type Props = {};

const NavigationContainer: React.FC<Props> = ({ children }) => {
	return <nav className="h-[80px] flex items-center justify-between pl-[20px] pr-[20px]">{children}</nav>;
};

export default NavigationContainer;
