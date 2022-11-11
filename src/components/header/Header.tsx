import React from 'react';
import clsx from 'clsx';

type Props = { className?: string };

const Header: React.FC<Props> = ({ children, className }) => {
  return <header className={clsx('bg-white', className)}>{children}</header>;
};

export default Header;
