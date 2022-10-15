import React from 'react';
import styles from './BottomLineInput.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
  placeholder: string;
  subtitle: string;
  onChange: (val: string) => void;
  value: string;
};

const BottomLineInput: React.FC<Props> = ({
  className,
  placeholder,
  subtitle,
  onChange,
  value
}) => {
  return (
    <div>
      <input
        type={'text'}
        className={clsx(styles.titleInput, className)}
        placeholder={placeholder}
        onChange={({ target: { value } }) => onChange(value)}
        value={value}
      />
      <div>
        <span>{subtitle}</span>
        <span className="float-right">100</span>
      </div>
    </div>
  );
};

export default BottomLineInput;
