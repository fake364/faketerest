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
      className={clsx(
        props.className,
        'rounded-form_radius',
        'border-[#cdcdcd]',
        'border-2',
        'focus:outline',
        'focus:outline-[#5DA3F6FF]',
        'focus:outline-4',
        'py-[8px]',
        'px-[16px]',
        'text-[16px]',
        'font-light'
      )}
    />
  );
};

export default CommonInput;
