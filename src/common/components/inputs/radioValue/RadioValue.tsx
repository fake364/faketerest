import React from 'react';
import Radio from '../radio/Radio';

export type RadioValueProps<T> = {
  value: T;
  label?: string;
  onChange: (val: T) => void;
  selected?: T;
};

const RadioValue = <T,>({
  value,
  label,
  onChange,
  selected
}: RadioValueProps<T>) => {
  const radioOnChange = (val: T) => () => onChange(val);
  return (
    <Radio
      onChange={radioOnChange(value)}
      label={label}
      checked={value === selected}
    />
  );
};

export default RadioValue;
