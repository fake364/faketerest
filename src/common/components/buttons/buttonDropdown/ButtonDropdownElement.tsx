import React from 'react';
import styles from './ButtonDropdownElement.module.css';
import clsx from 'clsx';

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const ButtonDropdownElement: React.FC<Props> = ({
  onClick,
  className,
  children
}) => {
  return (
    <div onClick={onClick} className={clsx(styles.dropdownElement, className)}>
      {children}
    </div>
  );
};

export default ButtonDropdownElement;
