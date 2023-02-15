import React from 'react';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
};

const TabButton: React.FC<Props> = ({
  isActive,
  onClick,
  children,
  disabled
}) => {
  return (
    <div
      className={clsx(
        'font-medium',
        'py-[8px] px-[12px] select-none cursor-pointer ',
        disabled && 'bg-[#e9e9e9] pointer-events-none',
        isActive
          ? 'border-b-[3px] border-black'
          : 'hover:bg-[#e9e9e9] active:scale-[95%] rounded-[8px]'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TabButton;
