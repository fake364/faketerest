import React from 'react';
import SliderDot from './dot/SliderDot';

type Props = { numberOfDots: number; activeDotNumber: number };

const SliderDots: React.FC<Props> = ({ numberOfDots, activeDotNumber }) => {
  const rangeArray = [...Array(numberOfDots).keys()];
  return (
    <div className={'flex gap-[8px]'}>
      {rangeArray.map((val) => (
        <SliderDot key={val} active={val <= activeDotNumber} />
      ))}
    </div>
  );
};

export default SliderDots;
