import React from 'react';
import clsx from 'clsx';

type Props = { className?: string };

const FakeCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx('bg-[white] rounded-[8px] p-[8px] w-[880px] mt-[32px]', className)}></div>
  );
};

export default FakeCard;
