import React from 'react';
import clsx from 'clsx';

type Props = { text: string; className?: string };

const Tooltip: React.FC<Props> = ({ children, text, className }) => {
  return (
    <div
      className={clsx(
        'relative [&>#tooltip]:hidden [&>#tooltip]:hover:block flex flex-col items-center justify-center',
        className
      )}
    >
      {children}
      <div
        id="tooltip"
        className="absolute bg-black bottom-[-45px] w-fit  p-[6px] text-[#ffffff] rounded-[8px]
      text-[14px]"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
