import React, { useContext } from 'react';
import { IconType } from '@react-icons/all-files';
import clsx from 'clsx';
import { THEME_TYPE } from '../../enums/theme';
import ThemeContext from '../../context/ThemeContext';
import style from './CircleIconButton.module.css';

type Props = { Icon: IconType; className?: string; onClick: () => void };

const CircleIconButton: React.FC<Props> = ({ Icon, className, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={clsx(
        style.circleButtonContainer,
        ' text-[24px] cursor-pointer',
        className
      )}
      data-theme={theme ? theme : THEME_TYPE.BASE}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
};

export default CircleIconButton;
