import React from 'react';
import clsx from 'clsx';
import { rowStartClasses } from './utils/constants';
import Image from 'next/image';
import { ImageGridProps } from './ImageGridCell';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';

interface Props extends Omit<ImageGridProps, 'isAnimated'> {
  style?: {
    WebkitTransformY: number;
    transformY: number;
  };
}

const sliderIndexMap = [
  SLIDER_THEMES.DINNER_IDEA,
  SLIDER_THEMES.HOME_DECOR,
  SLIDER_THEMES.NEW_OUTFIT,
  SLIDER_THEMES.THUMB_IDEA
];

const delays = [
  'delay-75',
  'delay-[500ms]',
  'delay-[700ms]',
  'delay-[900ms]',
  'delay-[1200ms]',
  'delay-[1500ms]',
  'delay-[1700ms]'
];

const notFirstRow = {
  0: 'delay-75',
  1: 'delay-[1700ms]',
  2: 'delay-[500ms]',
  3: 'delay-[1500ms]',
  4: 'delay-[700ms]',
  5: 'delay-[1200ms]',
  6: 'delay-[900ms]'
};

const ImageCell: React.FC<Props> = ({
  images,
  startFrom,
  index: animateIndex,
  shownType
}) => {
  return (
    <div
      className={clsx('row-span-4', rowStartClasses[startFrom - 1], 'relative')}
    >
      {images.map((image, index) => {
        const isNotShown = shownType !== sliderIndexMap[index];
        const chooseDelayIndex = animateIndex % 7;
        const delay = startFrom
          ? delays[chooseDelayIndex]
          : notFirstRow[chooseDelayIndex];
        const animatedClasses = clsx(
          'image-transitions',
          delay,
          isNotShown && 'invisible opacity-0'
        );
        return (
          <div key={sliderIndexMap[index]} className={animatedClasses}>
            <Image
              className={clsx('rounded-[16px]', 'h-max')}
              src={image}
              layout={'fill'}
              objectFit="cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageCell;
