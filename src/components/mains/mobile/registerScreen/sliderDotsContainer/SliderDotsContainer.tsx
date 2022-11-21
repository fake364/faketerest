import React from 'react';
import CircleIconButton from '../../../../../common/components/buttons/CircleIconButton';
import { BiChevronLeft } from '@react-icons/all-files/bi/BiChevronLeft';
import clsx from 'clsx';
import styles from '../MobileRegisterPage.module.css';
import SliderDots from '../sliderDots/SliderDots';

type Props = { onBack?: () => void; activeDotNumber: number };

const SliderDotsContainer: React.FC<Props> = ({ onBack, activeDotNumber }) => {
  return (
    <div className={'flex h-[50px] justify-center items-center'}>
      {onBack && (
        <CircleIconButton
          Icon={BiChevronLeft}
          onClick={onBack}
          className={clsx(styles.backButton, '!text-[48px]')}
        />
      )}
      <SliderDots numberOfDots={3} activeDotNumber={activeDotNumber} />
    </div>
  );
};

export default SliderDotsContainer;
