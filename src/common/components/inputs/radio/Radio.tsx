import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import styles from './Radio.module.css';

export type RadioProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  checked?: boolean;
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  name?: InputHTMLAttributes<HTMLInputElement>['name'];
};

const Radio: React.FC<RadioProps> = ({ onChange, label, checked, value, name }) => {
  return (
    <label className={styles.radioContainer}>
      {label}
      <input
        type="radio"
        onChange={onChange}
        checked={checked}
        value={value}
        name={name}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Radio;
