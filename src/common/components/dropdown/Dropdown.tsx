import React from 'react';
import clsx from 'clsx';
import styles from './Dropdown.module.css';

export type DropdownProps = { className?: string } & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Dropdown: React.FC<DropdownProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx('border-common_radius relative', className)}>
      <select className={clsx(styles.selectOutline)} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default Dropdown;
