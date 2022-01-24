import React, { useRef } from 'react';
import ImageGridCell from './grid-cell/ImageGridCell';

import { TemplateTypes } from '../../../../../common/types/template';
import CommonUtils from '../../../../../common/utils/creation-utils/arrays/common';
import SpecificCommons from '../../../../../common/utils/creation-utils/commons/commons';
import NumericFunctions from '../../../../../common/utils/functional-utils/numeric/utils.map';
import { SLIDER_THEMES } from '../../../../../common/enums/slider_themes';
import { CommonTypes } from '../../../../../common/types/common';

const getImageById = (type: SLIDER_THEMES, index: number) =>
	require(`../../../../../../public/images/main-slider/${type}/${index}.jpeg`);

const ImageGridContainer: React.FC<CommonTypes.ShownType> = ({ shownType }) => {
	const { current: indexArray } = useRef(SpecificCommons.getSliderIndexArray());

	return (
		<div className="slider-grid">
			{indexArray.map((value: number, index) => {
				const startFrom = CommonUtils.returnInSimpleRange(
					value,
					4,
					NumericFunctions.adjustTransform
				) as TemplateTypes.GridRowSpan;
				const src = getImageById(shownType, index + 1);
				return (
					<ImageGridCell
						key={index}
						src={src}
						startFrom={startFrom}
						shownType={shownType}
					/>
				);
			})}
		</div>
	);
};

export default ImageGridContainer;
