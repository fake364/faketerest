import React, { useState } from 'react';
import ExtendableInput from './extendableInput/ExtendableInput';
import clsx from 'clsx';
import styles from './BottomLineInput.module.css';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  className?: string;
  placeholder: string;
  subtitle: string;
  onChange: (val: string) => void;
  value: string;
  maxLength?: number;
  placeholderClassName?: string;
};

const BottomLineInput: React.FC<Props> = ({
  className,
  placeholder,
  subtitle,
  onChange,
  value,
  maxLength,
  placeholderClassName
}) => {
  const { t } = useTranslation('error-messages');

  const [isFocused, setFocus] = useState(false);

  const setFocusFlag = (flag: boolean) => () => setFocus(flag);
  const charactersLeft = maxLength - (value?.length || 0);
  const areTooManyChars = charactersLeft < 0;
  const isSubtitleShown = isFocused || areTooManyChars;

  return (
    <div>
      <ExtendableInput
        value={value}
        onChange={(value) => onChange(value)}
        placeholder={placeholder}
        className={clsx(areTooManyChars && styles.errorBottomBorder, className)}
        placeholderClassName={placeholderClassName}
        onBlur={setFocusFlag(false)}
        onFocus={setFocusFlag(true)}
      />
      {isSubtitleShown && (
        <div
          className={clsx(
            'text-[11px]  pt-[4px]',
            areTooManyChars ? 'text-[#CC0000]' : 'text-[gray]'
          )}
        >
          <span>{areTooManyChars ? t('tooManyCharacters') : subtitle}</span>
          {maxLength && <span className="float-right">{charactersLeft}</span>}
        </div>
      )}
    </div>
  );
};

export default BottomLineInput;
