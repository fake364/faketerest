import React from 'react';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import { ShownType } from '../../../../../../common/types/common';
import { SLIDER_ARRAY } from '../../../../../../common/classes/customClasses/SliderNode';

interface Props extends ShownType {
  images: Array<ImageProps['src']>;
}

const ImageCell: React.FC<Props> = ({ images, shownType }) => {
  return (
    <div className="mx-2 my-2 h-[25vh] xl:h-[25vh] 2xl:h-[35vh] relative">
      {images.map((image, index) => {
        const isNotShown = shownType !== SLIDER_ARRAY[index];
        const animatedClasses = clsx(
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
