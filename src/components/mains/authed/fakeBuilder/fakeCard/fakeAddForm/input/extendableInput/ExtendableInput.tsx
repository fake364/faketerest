import React from 'react';
import clsx from 'clsx';
import styles from '../BottomLineInput.module.css';
import ContentEditable from 'react-contenteditable';

type Props = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  placeholderClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  containerClass?: string;
  onClick?: () => void;
};

const ExtendableInput: React.FC<Props> = ({
  className,
  value,
  placeholder,
  onChange,
  placeholderClassName,
  onFocus,
  onBlur,
  containerClass,
  onClick
}) => {
  return (
    <div className={clsx('relative flex items-center', containerClass)}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore*/}
      <ContentEditable
        className={clsx(styles.expandableInput, className)}
        onChange={(event) => onChange(event.target.value)}
        tagName={'div'}
        html={value || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      />
      {placeholder && !value && (
        <div
          className={clsx(
            'absolute text-[#767676] pointer-events-none',
            placeholderClassName
          )}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default ExtendableInput;
