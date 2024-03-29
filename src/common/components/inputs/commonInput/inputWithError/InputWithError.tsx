import React from 'react';
import CommonInput, { CommonInputProps } from '../CommonInput';
import clsx from 'clsx';

type Props = CommonInputProps & {
  labelText?: string;
  variant?: 'topLabel' | 'errorLabelBottom';
  error?: string;
};

type LabelType = { labelText?: string; className?: string };

const InputLabel: React.FC<LabelType> = ({ labelText, className }) => {
  if (labelText) {
    return (
      <label
        className={clsx('px-[10px] block text-[14px] mt-[4px]', className)}
      >
        {labelText}
      </label>
    );
  }

  return null;
};

const InputWithError: React.FC<Props> = ({
  labelText,
  className,
  error,
  variant = 'errorLabelBottom',
  ...props
}) => {
  return (
    <div className="flex-1">
      {variant === 'topLabel' && (
        <InputLabel labelText={labelText} className={'font-[300]'} />
      )}
      <CommonInput
        {...props}
        id={props.id}
        className={clsx(
          className,
          labelText && variant === 'errorLabelBottom' && 'border-[#e60023]'
        )}
      />
      {(variant === 'errorLabelBottom' || error) && (
        <InputLabel
          labelText={error || labelText}
          className={'text-[#e60023] mt-[12px] max-w-[400px]'}
        />
      )}
    </div>
  );
};

export default InputWithError;
