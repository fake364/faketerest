import React from 'react';
import clsx from 'clsx';

type Props = { className?: string; active?: boolean };

const SliderDot: React.FC<Props> = ({ active = false }) => {
  return (
    <div
      className={clsx(
        'w-[9px] h-[9px]  rounded-[50%]',
        active ? 'bg-[#4d4c4c]' : 'bg-[#e1e1e1]'
      )}
    />
  );
};

export default SliderDot;
