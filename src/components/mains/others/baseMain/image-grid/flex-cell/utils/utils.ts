import { SLIDER_THEMES } from '../../../../../../../common/enums/slider_themes';
import { ImageProps } from 'next/image';
import NumericFunctions from '../../../../../../../common/utils/functional-utils/numeric/utils.map';
import CommonUtils from '../../../../../../../common/utils/creation-utils/arrays/common';
import chunk from 'lodash/chunk';
import { SLIDER_ARRAY } from '../../../../../../../common/classes/customClasses/SliderNode';

export const getImageById = (
  type: SLIDER_THEMES,
  index: number
): ImageProps['src'] =>
  `${window.location.origin}/public/images/main-slider/${type}/${
    index + 1
  }.jpeg`;

export const chunkImageIndexes = (count: number, chunksNumber: number) =>
  chunk(
    CommonUtils.range(count)
      .map(NumericFunctions.adjustToValue())
      .map((index) => SLIDER_ARRAY.map((theme) => getImageById(theme, index))),
    chunksNumber
  );

export const findAndSetHeaderVisibility = (value: string) => {
  const header = document.querySelector('header');
  if (header) {
    header.style.visibility = value;
  }
};
