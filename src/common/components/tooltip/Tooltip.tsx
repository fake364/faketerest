import React from 'react';

type Props = { text };

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <div className="relative [&>#tooltip]:hidden [&>#tooltip]:hover:block flex flex-col items-center justify-center">
      {children}
      <div id="tooltip" className="absolute bg-black bottom-[-45px] w-fit  p-[6px] text-[#ffffff] rounded-[8px]
      text-[14px]">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
