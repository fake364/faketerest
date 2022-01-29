import React, { useRef } from 'react';
import ImageGridCell from './grid-cell/ImageGridCell';

import { TemplateTypes } from '../../../../../common/types/template';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';
import SpecificCommons from '../../../../../common/utils/creation-utils/commons/commons';
import NumericFunctions from '../../../../../common/utils/functional-utils/numeric/utils.map';
import { CommonTypes } from '../../../../../common/types/common';
import { getSliderImagesMap } from './grid-cell/utils/utils';
import { SLIDER_THEMES } from '../../../../../common/enums/slider_themes';

const ImageGridContainer: React.FC<CommonTypes.ShownType> = ({ shownType }) => {
  const { current: indexArray } = useRef(SpecificCommons.getSliderIndexArray());
  const { current: imageMap } = useRef(getSliderImagesMap());

  return (
    <div className="slider-grid">
      {indexArray.map((value: number, index) => {
        const startFrom = CommonUtils.returnInSimpleRange(
          value,
          4,
          NumericFunctions.adjustTransform
        ) as TemplateTypes.GridRowSpan;
        const images = Object.values(SLIDER_THEMES).map(
          (theme) => imageMap[theme][index]
        );
        return (
          <ImageGridCell
            key={index}
            images={images}
            startFrom={startFrom}
            shownType={shownType}
            isAnimated={index < 21}
          />
        );
      })}
    </div>
  );
};

export default ImageGridContainer;
