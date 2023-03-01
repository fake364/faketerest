import React, { KeyboardEventHandler, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from '../BottomLineInput.module.css';

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
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
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
  onClick,
  onKeyDown
}) => {
  const inputRef = useRef<HTMLDivElement>();
  const onChangeTextContent = (event) => {
    if (inputRef.current) {
      inputRef.current.textContent = event.currentTarget.textContent;
      onChange(event.currentTarget.textContent);
    }
  };

  useEffect(() => {
    inputRef.current.textContent = value;
  }, [value]);
  console.log('RENDER INSIDE EXTENDABLE INPUT COMPONENT', value);

  return (
    <div className={clsx('relative flex items-center', containerClass)}>
      <div
        className={clsx(styles.expandableInput, className)}
        ref={inputRef}
        onInput={onChangeTextContent}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        contentEditable
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
