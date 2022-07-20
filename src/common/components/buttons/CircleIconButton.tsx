import React from 'react';
import { IconType } from '@react-icons/all-files';
import clsx from 'clsx';

type Props = { Icon: IconType; className?: string; onClick: () => void };

const CircleIconButton: React.FC<Props> = ({ Icon, className, onClick }) => {
  return (
    <div
      className={clsx(
        'transition-all duration-[300ms] hover:bg-[#f0f0f0] p-[12px] rounded-[50%] active:scale-75 text-[gray] flex items-center' +
          ' text-[24px] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
};

export default CircleIconButton;
