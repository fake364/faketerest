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

const ImageCell: React.FC<Props> = ({
  images,
  startFrom,
  style,
  shownType
}) => {
  return (
    <div
      className={clsx('row-span-4', rowStartClasses[startFrom - 1], 'relative')}
      style={
        style
          ? {
              WebkitTransform: `translate3d(0, -${style.WebkitTransformY}px, 0)`,
              transform: `translate3d(0, -${style.transformY}px, 0)`
            }
          : undefined
      }
    >
      {images.map((image, index) => {
        const isNotShown = shownType !== sliderIndexMap[index];
        return (
          <div
            key={sliderIndexMap[index]}
            className={clsx(
              'image-transitions',
              isNotShown && 'invisible opacity-0 translate-y-1'
            )}
          >
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
