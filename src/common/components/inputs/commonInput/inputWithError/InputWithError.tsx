import React from 'react';
import CommonInput, { CommonInputProps } from '../CommonInput';
import clsx from 'clsx';

type Props = CommonInputProps & { labelText?: string };

const InputWithError: React.FC<Props> = ({
  labelText,
  className,
  ...props
}) => {
  return (
    <div>
      <CommonInput
        {...props}
        id={props.id}
        className={clsx(className, labelText && 'border-[#e60023]')}
      />
      {labelText && (
        <label htmlFor={props.id} className="text-[#e60023]">
          {labelText}
        </label>
      )}
    </div>
  );
};

export default InputWithError;
