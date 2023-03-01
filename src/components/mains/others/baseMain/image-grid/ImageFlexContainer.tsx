import React, { useRef } from 'react';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';
import * as ImageUtils from './flex-cell/utils/utils';
import ImageCell from './flex-cell/ImageCell';
import clsx from 'clsx';
import { ShownType } from '../../../../../common/types/common';

const margins = ['', 'mt-[5rem]', 'mt-[10rem]', 'mt-[15rem]'];

const delays = [
  'opacity_move_up-0',
  'opacity_move_up-250',
  'opacity_move_up-500',
  'opacity_move_up-725',
  'opacity_move_up-1000',
  'opacity_move_up-1250',
  'opacity_move_up-1500'
];

type Props = { isAnimation: boolean } & ShownType;

const marginPalindrome = CommonUtils.numericPalindrome(3, 0);

const ImageFlexContainer: React.FC<Props> = ({ shownType, isAnimation }) => {
  const imagesRef = useRef(ImageUtils.chunkImageIndexes(34, 5));

  return (
    <div
      className={clsx(
        'slider-flex-container',
        isAnimation && 'slider-gradient'
      )}
    >
      {imagesRef.current.map((columnIndexes, columnIndex) => {
        const cellClass = clsx(
          'flex flex-col flex-1 relative',
          margins[marginPalindrome[columnIndex]],
          isAnimation && 'opacity_move_up',
          isAnimation && delays[columnIndex]
        );
        return (
          <div className={cellClass} key={columnIndex}>
            {columnIndexes.map((images, index) => (
              <ImageCell shownType={shownType} images={images} key={index} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ImageFlexContainer;
