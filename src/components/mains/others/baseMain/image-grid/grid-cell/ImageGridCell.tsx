import React from 'react';
import { ImageProps } from 'next/image';
import { CommonTypes } from '../../../../../../common/types/common';
import ImageCell from './ImageCell';

export interface ImageGridProps extends CommonTypes.ShownType {
  startFrom?: 1 | 2 | 3 | 4;
  images: Array<ImageProps['src']>;
  isAnimated: boolean;
}

const ImageGridCell: React.FC<ImageGridProps> = ({
  startFrom,
  images,
  shownType,
  isAnimated
}) => {
  return (
    <ImageCell images={images} startFrom={startFrom} shownType={shownType} />
  );
};

export default ImageGridCell;
