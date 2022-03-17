import React from 'react';

type Props = {};

const Header: React.FC<Props> = ({ children }) => {
	return <header className="bg-white">{children}</header>;
};

export default Header;
