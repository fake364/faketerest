import React, { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { THEME_TYPE } from '../../../enums/theme';
import clsx from 'clsx';

export interface BaseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  className,
  ...otherProps
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      {...otherProps}
      data-theme={theme ? theme : THEME_TYPE.BASE}
      className={clsx(
        'font-bold active:scale-90 active:brightness-15',
        className
      )}
    >
      {children}
    </button>
  );
};

export default BaseButton;
