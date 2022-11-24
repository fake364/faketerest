import React from 'react';
import CircleIconButton from '../../../../../../../../common/components/buttons/CircleIconButton';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import clsx from 'clsx';

type Props = { onBack: () => void; title: string; className?: string };

const TopBackAndTitlePanel: React.FC<Props> = ({
  onBack,
  title,
  className
}) => {
  return (
    <div
      className={clsx(
        'p-[4px] font-medium text-center relative items-center flex',
        className
      )}
    >
      <CircleIconButton
        className={' w-[45px] h-[45px] !text-[22px]'}
        Icon={FaArrowLeft}
        onClick={onBack}
      />
      <div className={'flex-1 mr-[36px] text-[18px]'}>{title}</div>
    </div>
  );
};

export default TopBackAndTitlePanel;
