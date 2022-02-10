import React from 'react';
import clsx from 'clsx';
import { rowStartClasses } from './utils/constants';
import Image, { ImageProps } from 'next/image';
import { SLIDER_THEMES } from '../../../../../../common/enums/slider_themes';
import { CommonTypes } from '../../../../../../common/types/common';
import { SLIDER_ARRAY } from '../../../../../../common/classes/customClasses/SliderNode';

interface Props extends CommonTypes.ShownType {
  images: Array<ImageProps['src']>;
}

// const sliderIndexMap = [
//   SLIDER_THEMES.DINNER_IDEA,
//   SLIDER_THEMES.HOME_DECOR,
//   SLIDER_THEMES.NEW_OUTFIT,
//   SLIDER_THEMES.THUMB_IDEA
// ];
//
// const delays = [
//   'delay-75',
//   'delay-[500ms]',
//   'delay-[700ms]',
//   'delay-[900ms]',
//   'delay-[1200ms]',
//   'delay-[1500ms]',
//   'delay-[1700ms]'
// ];
//
// const notFirstRow = {
//   0: 'delay-75',
//   1: 'delay-[1700ms]',
//   2: 'delay-[500ms]',
//   3: 'delay-[1500ms]',
//   4: 'delay-[700ms]',
//   5: 'delay-[1200ms]',
//   6: 'delay-[900ms]'
// };

const ImageCell: React.FC<Props> = ({ images, shownType }) => {
  return (
    <div className="mx-2 my-2 h-[25vh] xl:h-[25vh] 2xl:h-[35vh] relative">
      {images.map((image, index) => {
        const isNotShown = shownType !== SLIDER_ARRAY[index];
        // const delay = startFrom
        //   ? delays[chooseDelayIndex]
        //   : notFirstRow[chooseDelayIndex];
        const animatedClasses = clsx(
          // 'h-full',
          // 'transition-opacity',
          'duration-1000',
          isNotShown && 'invisible opacity-0'
        );
        return (
          <div className={animatedClasses}>
            <Image
              className={clsx('rounded-[16px]')}
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
