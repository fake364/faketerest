import React from 'react';
import RadioValue, { RadioValueProps } from '../radioValue/RadioValue';
import clsx from 'clsx';

type Props<T> = {
  className?: string;
  onChange: RadioValueProps<T>['onChange'];
  selected?: T;
  radioData: { value: T; label?: string }[];
};

const RadioValueGroup = <T,>({
  className,
  radioData,
  selected,
  onChange
}: Props<T>) => {
  return (
    <div className={clsx(className)}>
      {radioData.map(({ value, label }) => (
        <RadioValue
          onChange={onChange}
          label={label}
          value={value}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default RadioValueGroup;
