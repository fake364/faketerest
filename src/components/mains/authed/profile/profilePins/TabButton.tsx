import React from 'react';
import clsx from 'clsx';

type Props = { isActive: boolean; onClick?: () => void };

const TabButton: React.FC<Props> = ({ isActive, onClick, children }) => {
  return (
    <div
      className={clsx(
        'font-medium',
        'py-[8px] px-[12px]  cursor-pointer',
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
