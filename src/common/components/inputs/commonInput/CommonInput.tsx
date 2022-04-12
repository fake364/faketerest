import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export type CommonInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const CommonInput: FC<CommonInputProps> = (props) => {
  return (
    <input
      {...props}
      className={clsx('w-full', props.className, 'reg-form-input')}
    />
  );
};

export default CommonInput;
