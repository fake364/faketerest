import React, { useRef } from 'react';
import { CommonTypes } from '../../../../../common/types/common';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';
import { chunkImageIndexes, getImageById } from './flex-cell/utils/utils';
import ImageCell from './flex-cell/ImageCell';
import { SLIDER_ARRAY } from '../../../../../common/classes/customClasses/SliderNode';
import clsx from 'clsx';
import { Motion, spring } from 'react-motion';
import { ReactMotionLoop } from 'react-motion-loop';

const margins = ['', 'mt-[5rem]', 'mt-[10rem]', 'mt-[15rem]'];

const ImageFlexContainer: React.FC<CommonTypes.ShownType> = ({ shownType }) => {
  const { current: indexArray } = useRef(chunkImageIndexes(34, 5));
  const { current: marginPalindrome } = useRef(
    CommonUtils.numericPalindrome(3, 0)
  );
  return (
    <div className="slider-flex-container">
      {indexArray.map((columnIndexes, columnIndex) => (
        <ReactMotionLoop
          styleFrom={{ y: spring(0), opacity: spring(1) }}
          styleTo={{ y: spring(100), opacity: spring(0) }}
        >
          {({ y, opacity }) => (
            <div
              className={clsx(
                'flex flex-col flex-1 relative',
                margins[marginPalindrome[columnIndex]]
              )}
              style={{
                transitionDuration: '500ms',
                opacity,
                WebkitTransform: `translate3d(0, -${y}px, 0)`,
                transform: `translate3d(0, -${y}px, 0)`
              }}
            >
              {columnIndexes.map((imageIndex) => {
                const images = SLIDER_ARRAY.map((theme) =>
                  getImageById(theme, imageIndex)
                );
                return <ImageCell shownType={shownType} images={images} />;
              })}
            </div>
          )}
        </ReactMotionLoop>
      ))}
    </div>
  );
};

export default ImageFlexContainer;
