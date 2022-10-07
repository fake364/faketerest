import React from 'react';
import clsx from 'clsx';
import styles from './Dropdown.module.css';

type Props = { className?: string };

const Dropdown: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx('border-common_radius relative', className)}>
      <select className={clsx(styles.selectOutline)}>{children}</select>
    </div>
  );
};

export default Dropdown;
