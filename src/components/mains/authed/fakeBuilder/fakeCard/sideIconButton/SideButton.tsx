import React from 'react';
import clsx from 'clsx';

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const SideButton: React.FC<Props> = ({ onClick, children, className }) => {
  return (
    <div
      className={clsx(
        'bg-[white] py-[24px] px-[12px] m-[18px] rounded-[8px] cursor-pointer shadow-sm',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SideButton;
