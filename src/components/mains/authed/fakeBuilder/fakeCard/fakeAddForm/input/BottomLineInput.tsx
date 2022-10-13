import React from 'react';
import styles from './BottomLineInput.module.css';
import clsx from 'clsx';

type Props = { className?: string; placeholder: string; subtitle: string };

const BottomLineInput: React.FC<Props> = ({
  className,
  placeholder,
  subtitle
}) => {
  return (
    <div>
      <input
        type={'text'}
        className={clsx(styles.titleInput, className)}
        placeholder={placeholder}
      />
      <div>
        <span>{subtitle}</span>
        <span className="float-right">100</span>
      </div>
    </div>
  );
};

export default BottomLineInput;
