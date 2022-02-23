import React, { useRef } from 'react';
import { CommonTypes } from '../../../../../common/types/common';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';
import { chunkImageIndexes, getImageById } from './flex-cell/utils/utils';
import ImageCell from './flex-cell/ImageCell';
import { SLIDER_ARRAY } from '../../../../../common/classes/customClasses/SliderNode';
import clsx from 'clsx';

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

const ImageFlexContainer: React.FC<CommonTypes.ShownType> = ({ shownType }) => {
  const { current: indexArray } = useRef(chunkImageIndexes(34, 5));
  const { current: marginPalindrome } = useRef(
    CommonUtils.numericPalindrome(3, 0)
  );
  return (
    <div className="slider-flex-container">
      {indexArray.map((columnIndexes, columnIndex) => (
        <div
          className={clsx(
            'flex flex-col flex-1 relative',
            margins[marginPalindrome[columnIndex]],
            'opacity_move_up',
            delays[columnIndex]
          )}
        >
          {columnIndexes.map((imageIndex) => {
            const images = SLIDER_ARRAY.map((theme) =>
              getImageById(theme, imageIndex)
            );
            return <ImageCell shownType={shownType} images={images} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default ImageFlexContainer;
