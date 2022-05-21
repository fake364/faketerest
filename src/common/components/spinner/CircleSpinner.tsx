import React from 'react';
import Image from 'next/image';
import spinner from '../../../../public/images/loader.png';
import whiteSpinner from '../../../../public/images/whiteLoader.png';
import clsx from 'clsx';

export enum SPINNER_COLORS {
  DEFAULT,
  WHITE
}

type Props = { className?: string; color: SPINNER_COLORS };

const CircleSpinner: React.FC<Props> = ({
  className,
  color = SPINNER_COLORS.DEFAULT
}) => {
  let selectedSpinner = spinner;
  if (color === SPINNER_COLORS.WHITE) {
    selectedSpinner = whiteSpinner;
  }
  return (
    <div className={clsx(className, 'animate-spin')}>
      <Image width={'100%'} height={'100%'} src={selectedSpinner} />
    </div>
  );
};

export default CircleSpinner;
